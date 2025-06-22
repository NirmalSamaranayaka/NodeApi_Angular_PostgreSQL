/* @name AddMessageToTicket */
INSERT INTO messages (ticket_id, sender_id, sender_type, text)
VALUES (:ticketId, :senderId, :senderType, :text)
RETURNING message_id as "id"
    , sender_type as "senderType"
    , sender_id as "senderId"
    , text as "text"
    , created_at as "createdAt";

/* @name GetMessagesByTicket */
SELECT message_id as "id"
    , sender_type as "senderType"
    , sender_id as "senderId"
    , text as "text"
    , created_at as "createdAt"
FROM messages
WHERE ticket_id = :ticketId!
ORDER BY created_at;
