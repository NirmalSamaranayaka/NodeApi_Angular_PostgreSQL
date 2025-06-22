-- Up Migration
CREATE TYPE sender_type AS ENUM ('customer', 'operator');
CREATE TABLE messages (
    message_id SERIAL PRIMARY KEY,
    ticket_id BIGINT NOT NULL,
    sender_id VARCHAR NOT NULL,
    sender_type sender_type NOT NULL,
    text VARCHAR NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    FOREIGN KEY (ticket_id)
        REFERENCES tickets
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Down Migration
DROP TABLE messages;
DROP TYPE sender_type;
