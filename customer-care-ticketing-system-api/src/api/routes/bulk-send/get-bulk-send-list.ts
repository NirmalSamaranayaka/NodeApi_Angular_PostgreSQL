import { FastifyInstance } from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import * as BulkSendJobsQueries from "../../../queries/bulk-send-jobs.queries";
import {
  BulkSendJobListResponse,
  BulkSendJobResponse,
} from "./bulk-send.schemas";

export async function routeGetBulkSendList(instance: FastifyInstance) {
  instance.withTypeProvider<TypeBoxTypeProvider>().route({
    method: "GET",
    url: "/bulk-send/jobs",
    schema: {
      response: { 200: BulkSendJobListResponse },
    },
    handler: async (): Promise<any[]> => {
      const jobs = await BulkSendJobsQueries.listBulkSendJobs(instance.db);
      return jobs.map((job: any) => ({
        id: job.id,
        ticketIds: job.ticket_ids,
        message: job.message,
        status: job.status,
        createdAt: job.created_at,
        updatedAt: job.updated_at,
        progress: job.progress,
        results: job.results || {},
        succeededCount: job.succeeded_count,
        failedCount: job.failed_count,
        totalCount: job.total_count,
      }));
    },
  });
}
