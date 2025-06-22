-- Up Migration
CREATE INDEX messages_ticket_id_fk
ON messages (ticket_id);

-- Down Migration
DROP INDEX messages_ticket_id_fk;
