// import { FastifyInstance } from 'fastify';
// import { Type as T, Static } from '@sinclair/typebox';
// import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
// import * as BulkSendJobsQueries from '../../../queries/bulk-send-jobs.queries';
// import { addMessageToTicket } from '../../../queries/messages.queries';

// // --- TypeBox Schemas ---
// const BulkSendRequest = T.Object({
//   ticketIds: T.Array(T.Number()),
//   message: T.String(),
// });

// const BulkSendJobResponse = T.Object({
//   id: T.Number(),
//   ticketIds: T.Array(T.Number()),
//   message: T.String(),
//   status: T.String(),
//   createdAt: T.String({ format: 'date-time' }),
//   updatedAt: T.String({ format: 'date-time' }),
//   progress: T.Optional(T.Record(T.String(), T.String())),
//   results: T.Record(T.String(), T.String()),
//   succeededCount: T.Number(),
//   failedCount: T.Number(),
//   totalCount: T.Number(),

// });

// const BulkSendJobListResponse = T.Array(BulkSendJobResponse);

// // --- Inferred Response Type (camelCase, from schema) ---
// type BulkSendJob = Static<typeof BulkSendJobResponse>;

// //Simulate slow processing 
// function sleep(ms: number) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

// // --- Job Processor ---
// async function processBulkSendJob(jobId: number, ticketIds: number[], message: string, db: any) {
//   let succeeded = 0, failed = 0, results: Record<number, string> = {};

//   for (const ticketId of ticketIds) {
//     try {

//     // Simulate failure for selected IDs (e.g. 6, 26, 89)
//     // if ([6, 26, 89].includes(ticketId)) {
//     //   throw new Error('Simulated failure'); // simulate failure
//     // }

//     //Simulate slow processing (500ms per ticket)
//     //  await sleep(500);

//       await addMessageToTicket.run({
//         ticketId,
//         senderId: 'operator-system',
//         senderType: 'operator',
//         text: message
//       }, db);
//       succeeded++;
//       results[ticketId] = 'succeeded';
//     } catch {
//       failed++;
//       results[ticketId] = 'failed';
//     }

//     await BulkSendJobsQueries.updateBulkSendJobProgress(jobId, succeeded, failed, results, db);
//   }

//   await BulkSendJobsQueries.completeBulkSendJob(jobId, db);
// }

// // --- Routes ---
// export async function routeBulkSend(instance: FastifyInstance) {
//   instance.withTypeProvider<TypeBoxTypeProvider>().route({
//     method: 'POST',
//     url: '/bulk-send',
//     schema: {
//       body: BulkSendRequest,
//       response: { 200: BulkSendJobResponse }
//     },
//     handler: async (request, reply): Promise<BulkSendJob> => {
//       const { ticketIds, message } = request.body;
//       const job = await BulkSendJobsQueries.createBulkSendJob(ticketIds, message, instance.db);

//       processBulkSendJob(job.id, ticketIds, message, instance.db);

//       return {
//         id: job.id,
//         message: job.message,
//         status: job.status,
//         ticketIds: job.ticket_ids,
//         createdAt: job.created_at.toISOString(),
//         updatedAt: job.updated_at.toISOString(),
//         progress: job.progress,
//         results: job.results || {},
//         succeededCount: job.succeeded_count,
//         failedCount: job.failed_count,
//         totalCount: job.total_count,
//       };
//     }
//   });

//   instance.withTypeProvider<TypeBoxTypeProvider>().route({
//     method: 'GET',
//     url: '/bulk-send/jobs',
//     schema: {
//       response: { 200: BulkSendJobListResponse }
//     },
//     handler: async (): Promise<BulkSendJob[]> => {
//       const jobs = await BulkSendJobsQueries.listBulkSendJobs(instance.db);

//       return jobs.map((job:any): BulkSendJob => ({
//         id: job.id,
//         message: job.message,
//         status: job.status,
//         ticketIds: job.ticket_ids,
//         createdAt: job.created_at,
//         updatedAt: job.updated_at,
//         progress: job.progress,
//         results: job.results || {},
//         succeededCount: job.succeeded_count,
//         failedCount: job.failed_count,
//         totalCount: job.total_count,
//       }));
//     }
//   });

//   instance.withTypeProvider<TypeBoxTypeProvider>().route({
//     method: 'GET',
//     url: '/bulk-send/jobs/:jobId',
//     schema: {
//       params: T.Object({ jobId: T.String() }),
//       response: {
//         200: BulkSendJobResponse,
//         404: T.Object({ error: T.String() })
//       }
//     },
//     handler: async (request, reply): Promise<BulkSendJob | { error: string }> => {
//       const jobId = Number(request.params.jobId);
//       const job = await BulkSendJobsQueries.getBulkSendJob(jobId, instance.db);
//       if (!job) return reply.code(404).send({ error: 'Not found' });

//       return {
//         id: job.id,
//         message: job.message,
//         status: job.status,
//         ticketIds: job.ticket_ids,
//         createdAt: job.created_at,
//         updatedAt: job.updated_at,
//         progress: job.progress,
//         results: job.results || {},
//         succeededCount: job.succeeded_count,
//         failedCount: job.failed_count,
//         totalCount: job.total_count,
//       };
//     }
//   });
// }
