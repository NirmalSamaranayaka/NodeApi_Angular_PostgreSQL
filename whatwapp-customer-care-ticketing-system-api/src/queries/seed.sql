/*
    @name SeedTicket
    @param messages -> ((senderId, senderType, text, createdAt)...)
*/
WITH ticket AS (
    INSERT INTO tickets (subject, customer_id, created_at, updated_at, status)
    VALUES (:subject!, :customerId!, :created_at!, :created_at!, :status!)
    RETURNING ticket_id
), raw_messages(sender_id, sender_type, text, created_at) as (
    VALUES :messages
), result as (
    INSERT INTO messages(ticket_id, sender_id, sender_type, text, created_at)
    SELECT ticket.ticket_id, sender_id::varchar, sender_type::sender_type, text::varchar, created_at::timestamp
    FROM raw_messages, ticket
    RETURNING *
)
SELECT *
FROM result;
