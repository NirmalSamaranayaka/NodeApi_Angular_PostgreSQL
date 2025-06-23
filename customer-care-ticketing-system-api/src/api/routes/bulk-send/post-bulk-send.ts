import { FastifyInstance } from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import * as BulkSendJobsQueries from "../../../queries/bulk-send-jobs.queries";
import { BulkSendRequest, BulkSendJobResponse } from "./bulk-send.schemas";
import { processBulkSendJob } from "./bulk-send.service";

export async function routePostBulkSend(instance: FastifyInstance) {
  instance.withTypeProvider<TypeBoxTypeProvider>().route({
    method: "POST",
    url: "/bulk-send",
    schema: {
      body: BulkSendRequest,
      response: { 200: BulkSendJobResponse },
    },
    handler: async (request): Promise<any> => {
      const { ticketIds, message } = request.body;
      const job = await BulkSendJobsQueries.createBulkSendJob(
        ticketIds,
        message,
        instance.db
      );

      processBulkSendJob(job.id, ticketIds, message, instance.db);

      return {
        id: job.id,
        ticketIds: job.ticket_ids,
        message: job.message,
        status: job.status,
        createdAt: job.created_at.toISOString(),
        updatedAt: job.updated_at.toISOString(),
        progress: job.progress,
        results: job.results || {},
        succeededCount: job.succeeded_count,
        failedCount: job.failed_count,
        totalCount: job.total_count,
      };
    },
  });
}
