import { FastifyInstance } from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import * as BulkSendJobsQueries from "../../../queries/bulk-send-jobs.queries";
import {
  BulkSendJobResponse,
  BulkSendJobParams,
  NotFoundResponse,
} from "./bulk-send.schemas";

export async function routeGetBulkSendJobById(instance: FastifyInstance) {
  instance.withTypeProvider<TypeBoxTypeProvider>().route({
    method: "GET",
    url: "/bulk-send/jobs/:jobId",
    schema: {
      params: BulkSendJobParams,
      response: {
        200: BulkSendJobResponse,
        404: NotFoundResponse,
      },
    },
    handler: async (request, reply) => {
      const jobId = Number(request.params.jobId);
      const job = await BulkSendJobsQueries.getBulkSendJob(jobId, instance.db);

      if (!job) return reply.code(404).send({ error: "Not found" });

      return {
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
      };
    },
  });
}
