/* @name CreateTicket */
WITH ticket AS (
    INSERT INTO tickets (subject, customer_id)
    VALUES (:subject!, :customerId!)
    RETURNING *
), message as (
    INSERT INTO messages (ticket_id, sender_id, sender_type, text)
    SELECT ticket_id, :senderId!, :senderType!, :text!
    FROM ticket
)
SELECT ticket_id as "id"
    , subject as "subject"
    , status as "status!"
    , customer_id as "customerId!"
    , created_at as "createdAt"
FROM ticket;

/* @name ListTickets */
SELECT ticket_id as "id"
    , subject as "subject"
    , status as "status!"
    , customer_id as "customerId!"
    , created_at as "createdAt"
    , closed_at as "closedAt"
FROM tickets
WHERE (:status::ticket_status IS NULL OR status = :status)
ORDER BY created_at;

/* @name GetTicket */
SELECT ticket_id as "id"
    , subject as "subject"
    , status as "status!"
    , customer_id as "customerId!"
    , created_at as "createdAt"
    , closed_at as "closedAt"
FROM tickets
WHERE ticket_id = :id!;

/* @name DeleteTicket */
DELETE FROM tickets
WHERE ticket_id = :id
RETURNING ticket_id as "id";

/* @name ResolveTicket */
UPDATE tickets
SET status = 'resolved'
WHERE ticket_id = :id
RETURNING ticket_id as "id"
    , subject as "subject"
    , status as "status!"
    , created_at as "createdAt"
    , closed_at as "closedAt";

/* @name IsTicketUnresolved */
SELECT status = 'unresolved' as "ok"
FROM tickets
WHERE ticket_id = :ticketId;
