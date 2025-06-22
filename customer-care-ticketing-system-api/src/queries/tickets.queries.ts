/** Types generated for queries found in "src/queries/tickets.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type sender_type = 'customer' | 'operator';

export type ticket_status = 'resolved' | 'unresolved';

/** 'CreateTicket' parameters type */
export interface ICreateTicketParams {
  customerId: string;
  senderId: string;
  senderType: sender_type;
  subject: string;
  text: string;
}

/** 'CreateTicket' return type */
export interface ICreateTicketResult {
  createdAt: Date;
  customerId: string;
  id: number;
  status: ticket_status;
  subject: string;
}

/** 'CreateTicket' query type */
export interface ICreateTicketQuery {
  params: ICreateTicketParams;
  result: ICreateTicketResult;
}

const createTicketIR: any = {"usedParamSet":{"subject":true,"customerId":true,"senderId":true,"senderType":true,"text":true},"params":[{"name":"subject","required":true,"transform":{"type":"scalar"},"locs":[{"a":76,"b":84}]},{"name":"customerId","required":true,"transform":{"type":"scalar"},"locs":[{"a":87,"b":98}]},{"name":"senderId","required":true,"transform":{"type":"scalar"},"locs":[{"a":222,"b":231}]},{"name":"senderType","required":true,"transform":{"type":"scalar"},"locs":[{"a":234,"b":245}]},{"name":"text","required":true,"transform":{"type":"scalar"},"locs":[{"a":248,"b":253}]}],"statement":"WITH ticket AS (\n    INSERT INTO tickets (subject, customer_id)\n    VALUES (:subject!, :customerId!)\n    RETURNING *\n), message as (\n    INSERT INTO messages (ticket_id, sender_id, sender_type, text)\n    SELECT ticket_id, :senderId!, :senderType!, :text!\n    FROM ticket\n)\nSELECT ticket_id as \"id\"\n    , subject as \"subject\"\n    , status as \"status!\"\n    , customer_id as \"customerId!\"\n    , created_at as \"createdAt\"\nFROM ticket"};

/**
 * Query generated from SQL:
 * ```
 * WITH ticket AS (
 *     INSERT INTO tickets (subject, customer_id)
 *     VALUES (:subject!, :customerId!)
 *     RETURNING *
 * ), message as (
 *     INSERT INTO messages (ticket_id, sender_id, sender_type, text)
 *     SELECT ticket_id, :senderId!, :senderType!, :text!
 *     FROM ticket
 * )
 * SELECT ticket_id as "id"
 *     , subject as "subject"
 *     , status as "status!"
 *     , customer_id as "customerId!"
 *     , created_at as "createdAt"
 * FROM ticket
 * ```
 */
export const createTicket = new PreparedQuery<ICreateTicketParams,ICreateTicketResult>(createTicketIR);


/** 'ListTickets' parameters type */
export interface IListTicketsParams {
  status?: ticket_status | null | void;
}

/** 'ListTickets' return type */
export interface IListTicketsResult {
  closedAt: Date | null;
  createdAt: Date;
  customerId: string;
  id: number;
  status: ticket_status;
  subject: string;
}

/** 'ListTickets' query type */
export interface IListTicketsQuery {
  params: IListTicketsParams;
  result: IListTicketsResult;
}

const listTicketsIR: any = {"usedParamSet":{"status":true},"params":[{"name":"status","required":false,"transform":{"type":"scalar"},"locs":[{"a":195,"b":201},{"a":238,"b":244}]}],"statement":"SELECT ticket_id as \"id\"\n    , subject as \"subject\"\n    , status as \"status!\"\n    , customer_id as \"customerId!\"\n    , created_at as \"createdAt\"\n    , closed_at as \"closedAt\"\nFROM tickets\nWHERE (:status::ticket_status IS NULL OR status = :status)\nORDER BY created_at"};

/**
 * Query generated from SQL:
 * ```
 * SELECT ticket_id as "id"
 *     , subject as "subject"
 *     , status as "status!"
 *     , customer_id as "customerId!"
 *     , created_at as "createdAt"
 *     , closed_at as "closedAt"
 * FROM tickets
 * WHERE (:status::ticket_status IS NULL OR status = :status)
 * ORDER BY created_at
 * ```
 */
export const listTickets = new PreparedQuery<IListTicketsParams,IListTicketsResult>(listTicketsIR);


/** 'GetTicket' parameters type */
export interface IGetTicketParams {
  id: number;
}

/** 'GetTicket' return type */
export interface IGetTicketResult {
  closedAt: Date | null;
  createdAt: Date;
  customerId: string;
  id: number;
  status: ticket_status;
  subject: string;
}

/** 'GetTicket' query type */
export interface IGetTicketQuery {
  params: IGetTicketParams;
  result: IGetTicketResult;
}

const getTicketIR: any = {"usedParamSet":{"id":true},"params":[{"name":"id","required":true,"transform":{"type":"scalar"},"locs":[{"a":206,"b":209}]}],"statement":"SELECT ticket_id as \"id\"\n    , subject as \"subject\"\n    , status as \"status!\"\n    , customer_id as \"customerId!\"\n    , created_at as \"createdAt\"\n    , closed_at as \"closedAt\"\nFROM tickets\nWHERE ticket_id = :id!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT ticket_id as "id"
 *     , subject as "subject"
 *     , status as "status!"
 *     , customer_id as "customerId!"
 *     , created_at as "createdAt"
 *     , closed_at as "closedAt"
 * FROM tickets
 * WHERE ticket_id = :id!
 * ```
 */
export const getTicket = new PreparedQuery<IGetTicketParams,IGetTicketResult>(getTicketIR);


/** 'DeleteTicket' parameters type */
export interface IDeleteTicketParams {
  id?: number | null | void;
}

/** 'DeleteTicket' return type */
export interface IDeleteTicketResult {
  id: number;
}

/** 'DeleteTicket' query type */
export interface IDeleteTicketQuery {
  params: IDeleteTicketParams;
  result: IDeleteTicketResult;
}

const deleteTicketIR: any = {"usedParamSet":{"id":true},"params":[{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":38,"b":40}]}],"statement":"DELETE FROM tickets\nWHERE ticket_id = :id\nRETURNING ticket_id as \"id\""};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM tickets
 * WHERE ticket_id = :id
 * RETURNING ticket_id as "id"
 * ```
 */
export const deleteTicket = new PreparedQuery<IDeleteTicketParams,IDeleteTicketResult>(deleteTicketIR);


/** 'ResolveTicket' parameters type */
export interface IResolveTicketParams {
  id?: number | null | void;
}

/** 'ResolveTicket' return type */
export interface IResolveTicketResult {
  closedAt: Date | null;
  createdAt: Date;
  id: number;
  status: ticket_status;
  subject: string;
}

/** 'ResolveTicket' query type */
export interface IResolveTicketQuery {
  params: IResolveTicketParams;
  result: IResolveTicketResult;
}

const resolveTicketIR: any = {"usedParamSet":{"id":true},"params":[{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":57,"b":59}]}],"statement":"UPDATE tickets\nSET status = 'resolved'\nWHERE ticket_id = :id\nRETURNING ticket_id as \"id\"\n    , subject as \"subject\"\n    , status as \"status!\"\n    , created_at as \"createdAt\"\n    , closed_at as \"closedAt\""};

/**
 * Query generated from SQL:
 * ```
 * UPDATE tickets
 * SET status = 'resolved'
 * WHERE ticket_id = :id
 * RETURNING ticket_id as "id"
 *     , subject as "subject"
 *     , status as "status!"
 *     , created_at as "createdAt"
 *     , closed_at as "closedAt"
 * ```
 */
export const resolveTicket = new PreparedQuery<IResolveTicketParams,IResolveTicketResult>(resolveTicketIR);


/** 'IsTicketUnresolved' parameters type */
export interface IIsTicketUnresolvedParams {
  ticketId?: number | null | void;
}

/** 'IsTicketUnresolved' return type */
export interface IIsTicketUnresolvedResult {
  ok: boolean | null;
}

/** 'IsTicketUnresolved' query type */
export interface IIsTicketUnresolvedQuery {
  params: IIsTicketUnresolvedParams;
  result: IIsTicketUnresolvedResult;
}

const isTicketUnresolvedIR: any = {"usedParamSet":{"ticketId":true},"params":[{"name":"ticketId","required":false,"transform":{"type":"scalar"},"locs":[{"a":68,"b":76}]}],"statement":"SELECT status = 'unresolved' as \"ok\"\nFROM tickets\nWHERE ticket_id = :ticketId"};

/**
 * Query generated from SQL:
 * ```
 * SELECT status = 'unresolved' as "ok"
 * FROM tickets
 * WHERE ticket_id = :ticketId
 * ```
 */
export const isTicketUnresolved = new PreparedQuery<IIsTicketUnresolvedParams,IIsTicketUnresolvedResult>(isTicketUnresolvedIR);


