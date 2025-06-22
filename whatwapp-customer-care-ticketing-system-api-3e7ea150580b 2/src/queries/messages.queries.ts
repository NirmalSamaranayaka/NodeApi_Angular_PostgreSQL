/** Types generated for queries found in "src/queries/messages.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type sender_type = 'customer' | 'operator';

export type NumberOrString = number | string;

/** 'AddMessageToTicket' parameters type */
export interface IAddMessageToTicketParams {
  senderId?: string | null | void;
  senderType?: sender_type | null | void;
  text?: string | null | void;
  ticketId?: NumberOrString | null | void;
}

/** 'AddMessageToTicket' return type */
export interface IAddMessageToTicketResult {
  createdAt: Date;
  id: number;
  senderId: string;
  senderType: sender_type;
  text: string;
}

/** 'AddMessageToTicket' query type */
export interface IAddMessageToTicketQuery {
  params: IAddMessageToTicketParams;
  result: IAddMessageToTicketResult;
}

const addMessageToTicketIR: any = {"usedParamSet":{"ticketId":true,"senderId":true,"senderType":true,"text":true},"params":[{"name":"ticketId","required":false,"transform":{"type":"scalar"},"locs":[{"a":71,"b":79}]},{"name":"senderId","required":false,"transform":{"type":"scalar"},"locs":[{"a":82,"b":90}]},{"name":"senderType","required":false,"transform":{"type":"scalar"},"locs":[{"a":93,"b":103}]},{"name":"text","required":false,"transform":{"type":"scalar"},"locs":[{"a":106,"b":110}]}],"statement":"INSERT INTO messages (ticket_id, sender_id, sender_type, text)\nVALUES (:ticketId, :senderId, :senderType, :text)\nRETURNING message_id as \"id\"\n    , sender_type as \"senderType\"\n    , sender_id as \"senderId\"\n    , text as \"text\"\n    , created_at as \"createdAt\""};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO messages (ticket_id, sender_id, sender_type, text)
 * VALUES (:ticketId, :senderId, :senderType, :text)
 * RETURNING message_id as "id"
 *     , sender_type as "senderType"
 *     , sender_id as "senderId"
 *     , text as "text"
 *     , created_at as "createdAt"
 * ```
 */
export const addMessageToTicket = new PreparedQuery<IAddMessageToTicketParams,IAddMessageToTicketResult>(addMessageToTicketIR);


/** 'GetMessagesByTicket' parameters type */
export interface IGetMessagesByTicketParams {
  ticketId: NumberOrString;
}

/** 'GetMessagesByTicket' return type */
export interface IGetMessagesByTicketResult {
  createdAt: Date;
  id: number;
  senderId: string;
  senderType: sender_type;
  text: string;
}

/** 'GetMessagesByTicket' query type */
export interface IGetMessagesByTicketQuery {
  params: IGetMessagesByTicketParams;
  result: IGetMessagesByTicketResult;
}

const getMessagesByTicketIR: any = {"usedParamSet":{"ticketId":true},"params":[{"name":"ticketId","required":true,"transform":{"type":"scalar"},"locs":[{"a":175,"b":184}]}],"statement":"SELECT message_id as \"id\"\n    , sender_type as \"senderType\"\n    , sender_id as \"senderId\"\n    , text as \"text\"\n    , created_at as \"createdAt\"\nFROM messages\nWHERE ticket_id = :ticketId!\nORDER BY created_at"};

/**
 * Query generated from SQL:
 * ```
 * SELECT message_id as "id"
 *     , sender_type as "senderType"
 *     , sender_id as "senderId"
 *     , text as "text"
 *     , created_at as "createdAt"
 * FROM messages
 * WHERE ticket_id = :ticketId!
 * ORDER BY created_at
 * ```
 */
export const getMessagesByTicket = new PreparedQuery<IGetMessagesByTicketParams,IGetMessagesByTicketResult>(getMessagesByTicketIR);


