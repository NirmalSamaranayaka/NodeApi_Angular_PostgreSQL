import * as BulkSendJobsQueries from "../../../queries/bulk-send-jobs.queries";
import { addMessageToTicket } from "../../../queries/messages.queries";
import { getTicket } from "../../../queries/tickets.queries";

type SenderType = "customer" | "operator";

interface SenderInfo {
  senderId?: string;
  senderType?: SenderType;
}

//Simulate slow processing
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function processBulkSendJob(
  jobId: number,
  ticketIds: number[],
  message: string,
  db: any,
  sender: SenderInfo = {}
) {
  let succeeded = 0;
  let failed = 0;
  const results: Record<number, string> = {};
  const { senderId = "operator-system", senderType = "operator" } = sender;

  for (const ticketId of ticketIds) {
    try {
      const ticketRows = await getTicket.run({ id: ticketId }, db);

      if (ticketRows.length === 0) {
        results[ticketId] = "not_found";
        failed++;
        continue;
      }

      const [ticket] = ticketRows;

      if (ticket.status === "resolved") {
        results[ticketId] = "skipped_resolved";
        failed++;
        continue;
      }

      // Simulate failure for selected IDs (e.g. 6, 26, 89)
      // if ([6, 26, 89].includes(ticketId)) {
      //   throw new Error('Simulated failure'); // simulate failure
      // }

      // Simulate slow processing (500ms per ticket)
      await sleep(500);

      await addMessageToTicket.run(
        {
          ticketId,
          senderId,
          senderType,
          text: message,
        },
        db
      );

      succeeded++;
      results[ticketId] = "succeeded";
    } catch (err) {
      failed++;
      results[ticketId] = "failed";
    }

    await BulkSendJobsQueries.updateBulkSendJobProgress(
      jobId,
      succeeded,
      failed,
      results,
      db
    );
  }

  await BulkSendJobsQueries.completeBulkSendJob(jobId, db);
}
