-- Up Migration
CREATE TYPE ticket_status AS ENUM ('unresolved', 'resolved');
CREATE TABLE tickets (
    ticket_id SERIAL PRIMARY KEY,
    subject VARCHAR NOT NULL,
    status ticket_status DEFAULT 'unresolved',
    customer_id VARCHAR NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    closed_at TIMESTAMP NULL,
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Down Migration
DROP TABLE tickets;
DROP TYPE ticket_status;
