import { FastifyInstance } from "fastify";
import { isTicketUnresolved } from "../../../queries/tickets.queries";
import assert from "assert";
import { Type as T } from "@sinclair/typebox";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { addMessageToTicket } from "../../../queries/messages.queries";
import { BadRequest } from "http-errors";

const body = T.Object({
  senderType: T.Union([
    T.Literal("customer"),
    T.Literal("operator"),
  ]),
  senderId: T.String(),
  text: T.String(),
});

const response = T.Object({
  id: T.Number(),
  senderType: T.Union([
    T.Literal("customer"),
    T.Literal("operator"),
  ]),
  senderId: T.String(),
  text: T.String(),
  createdAt: T.String({ format: "date-time" }),
});

const params = T.Object({
  ticketId: T.Number(),
})

export async function routeAddMessageToTicket(instance: FastifyInstance) {
  instance.withTypeProvider<TypeBoxTypeProvider>().route({
    method: "POST",
    url: "/tickets/:ticketId/messages",
    schema: {
      params,
      body,
      response: { 200: response },
    },
    handler: async (req) => {
      const { ticketId } = req.params;
      const { text, senderId, senderType } = req.body;
      assert.ok(instance.db);
      const [{ ok }] = await isTicketUnresolved.run({ ticketId }, instance.db);
      if (!ok) {
        throw new BadRequest("Ticket is resolved");
      }
      const messages = await addMessageToTicket.run({
        ticketId,
        text,
        senderType,
        senderId,
      }, instance.db);
      assert.ok(messages.length === 1);
      const [{ createdAt, ...message }] = messages;
      return {
        ...message,
        createdAt: createdAt.toISOString(),
      };
    }
  })
}
