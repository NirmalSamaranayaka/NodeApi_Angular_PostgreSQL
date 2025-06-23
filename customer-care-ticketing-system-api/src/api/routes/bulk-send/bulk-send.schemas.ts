import { Type as T } from "@sinclair/typebox";

export const BulkSendRequest = T.Object({
  ticketIds: T.Array(T.Number()),
  message: T.String(),
});

export const BulkSendJobResponse = T.Object({
  id: T.Number(),
  ticketIds: T.Array(T.Number()),
  message: T.String(),
  status: T.String(),
  createdAt: T.String({ format: "date-time" }),
  updatedAt: T.String({ format: "date-time" }),
  progress: T.Optional(T.Record(T.String(), T.String())),
  results: T.Record(T.String(), T.String()),
  succeededCount: T.Number(),
  failedCount: T.Number(),
  totalCount: T.Number(),
});

export const BulkSendJobListResponse = T.Array(BulkSendJobResponse);

export const BulkSendJobParams = T.Object({
  jobId: T.String(),
});

export const NotFoundResponse = T.Object({
  error: T.String(),
});
