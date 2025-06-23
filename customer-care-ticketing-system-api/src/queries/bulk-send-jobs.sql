-- name: CreateBulkSendJob
INSERT INTO bulk_send_jobs (message, status, ticket_ids, total_count)
VALUES (:message, 'inProgress', :ticket_ids, :total_count)
RETURNING *;

-- name: UpdateBulkSendJobProgress
UPDATE bulk_send_jobs
SET succeeded_count = :succeeded_count,
    failed_count = :failed_count,
    results = :results,
    updated_at = NOW()
WHERE id = :id;

-- name: CompleteBulkSendJob
UPDATE bulk_send_jobs
SET status = 'completed', updated_at = NOW()
WHERE id = :id;

-- name: ListBulkSendJobs
SELECT * FROM bulk_send_jobs ORDER BY created_at DESC;

-- name: GetBulkSendJob
SELECT * FROM bulk_send_jobs WHERE id = :id; 