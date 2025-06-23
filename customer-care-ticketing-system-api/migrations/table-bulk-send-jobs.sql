-- Up Migration
CREATE TABLE bulk_send_jobs (
    id SERIAL PRIMARY KEY,
    message TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'inProgress',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    succeeded_count INTEGER DEFAULT 0,
    failed_count INTEGER DEFAULT 0,
    total_count INTEGER DEFAULT 0,
    ticket_ids INTEGER[] NOT NULL,
    results JSONB DEFAULT '{}'
);

-- Down Migration
DROP TABLE bulk_send_jobs;