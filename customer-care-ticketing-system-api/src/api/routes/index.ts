import { FastifyInstance } from "fastify";
import { routeListTickets } from "./tickets/list-tickets";
import { routeGetTicket } from "./tickets/get-ticket";
import { routeAddMessageToTicket } from "./tickets/add-ticket-message";
import { routeCreateTicket } from "./tickets/create-ticket";
import { routeDeleteTicket } from "./tickets/delete-ticket";
import { routeResolveTicket } from "./tickets/resolve-ticket";
import { routeListTicketMessages } from "./tickets/list-ticket-messages";
import { routePostBulkSend } from "./bulk-send/post-bulk-send";
import { routeGetBulkSendList } from "./bulk-send/get-bulk-send-list";
import { routeGetBulkSendJobById } from "./bulk-send/get-bulk-send-job-id";

export async function routes(instance: FastifyInstance) {
  instance
    .register(routeListTickets)
    .register(routeGetTicket)
    .register(routeDeleteTicket)
    .register(routeCreateTicket)
    .register(routeAddMessageToTicket)
    .register(routeResolveTicket)
    .register(routeListTicketMessages)   
    .register(routePostBulkSend)
    .register(routeGetBulkSendList)
    .register(routeGetBulkSendJobById)
    ;
}
