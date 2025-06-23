export async function createBulkSendJob(
  ticketIds: number[],
  message: string,
  db: any
) {
  const totalCount = ticketIds.length;
  const result = await db.query(
    `INSERT INTO bulk_send_jobs (message, status, total_count, ticket_ids)
     VALUES ($1, 'inProgress', $2, $3)
     RETURNING *`,
    [message, totalCount, ticketIds]
  );
  return result.rows[0];
}

export async function listBulkSendJobs(db: any) {
  const result = await db.query(
    `SELECT * FROM bulk_send_jobs ORDER BY created_at DESC`
  );
  return result.rows;
}

export async function getBulkSendJob(jobId: number, db: any) {
  const result = await db.query(`SELECT * FROM bulk_send_jobs WHERE id = $1`, [
    jobId,
  ]);
  return result.rows[0] || null;
}

export async function updateBulkSendJobProgress(
  jobId: number,
  succeeded: number,
  failed: number,
  results: Record<number, string>,
  db: any
) {
  await db.query(
    `UPDATE bulk_send_jobs
     SET succeeded_count = $1,
         failed_count = $2,
         results = $3,
         updated_at = NOW()
     WHERE id = $4`,
    [succeeded, failed, JSON.stringify(results), jobId]
  );
}

export async function completeBulkSendJob(jobId: number, db: any) {
  await db.query(
    `UPDATE bulk_send_jobs
     SET status = 'completed', updated_at = NOW()
     WHERE id = $1`,
    [jobId]
  );
}
