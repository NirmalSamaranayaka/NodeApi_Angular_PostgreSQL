/** Types generated for queries found in "src/queries/seed.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type sender_type = 'customer' | 'operator';

export type ticket_status = 'resolved' | 'unresolved';

/** 'SeedTicket' parameters type */
export interface ISeedTicketParams {
  created_at: Date;
  customerId: string;
  messages: readonly ({
    senderId: string | null | void,
    senderType: string | null | void,
    text: string | null | void,
    createdAt: string | null | void
  })[];
  status: ticket_status;
  subject: string;
}

/** 'SeedTicket' return type */
export interface ISeedTicketResult {
  created_at: Date;
  message_id: number;
  sender_id: string;
  sender_type: sender_type;
  text: string;
  ticket_id: string;
}

/** 'SeedTicket' query type */
export interface ISeedTicketQuery {
  params: ISeedTicketParams;
  result: ISeedTicketResult;
}

const seedTicketIR: any = {"usedParamSet":{"subject":true,"customerId":true,"created_at":true,"status":true,"messages":true},"params":[{"name":"messages","required":false,"transform":{"type":"pick_array_spread","keys":[{"name":"senderId","required":false},{"name":"senderType","required":false},{"name":"text","required":false},{"name":"createdAt","required":false}]},"locs":[{"a":269,"b":277}]},{"name":"subject","required":true,"transform":{"type":"scalar"},"locs":[{"a":108,"b":116}]},{"name":"customerId","required":true,"transform":{"type":"scalar"},"locs":[{"a":119,"b":130}]},{"name":"created_at","required":true,"transform":{"type":"scalar"},"locs":[{"a":133,"b":144},{"a":147,"b":158}]},{"name":"status","required":true,"transform":{"type":"scalar"},"locs":[{"a":161,"b":168}]}],"statement":"WITH ticket AS (\n    INSERT INTO tickets (subject, customer_id, created_at, updated_at, status)\n    VALUES (:subject!, :customerId!, :created_at!, :created_at!, :status!)\n    RETURNING ticket_id\n), raw_messages(sender_id, sender_type, text, created_at) as (\n    VALUES :messages\n), result as (\n    INSERT INTO messages(ticket_id, sender_id, sender_type, text, created_at)\n    SELECT ticket.ticket_id, sender_id::varchar, sender_type::sender_type, text::varchar, created_at::timestamp\n    FROM raw_messages, ticket\n    RETURNING *\n)\nSELECT *\nFROM result"};

/**
 * Query generated from SQL:
 * ```
 * WITH ticket AS (
 *     INSERT INTO tickets (subject, customer_id, created_at, updated_at, status)
 *     VALUES (:subject!, :customerId!, :created_at!, :created_at!, :status!)
 *     RETURNING ticket_id
 * ), raw_messages(sender_id, sender_type, text, created_at) as (
 *     VALUES :messages
 * ), result as (
 *     INSERT INTO messages(ticket_id, sender_id, sender_type, text, created_at)
 *     SELECT ticket.ticket_id, sender_id::varchar, sender_type::sender_type, text::varchar, created_at::timestamp
 *     FROM raw_messages, ticket
 *     RETURNING *
 * )
 * SELECT *
 * FROM result
 * ```
 */
export const seedTicket = new PreparedQuery<ISeedTicketParams,ISeedTicketResult>(seedTicketIR);


