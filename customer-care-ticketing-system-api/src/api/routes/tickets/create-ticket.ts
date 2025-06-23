import { FastifyInstance } from "fastify";
import { createTicket } from "../../../queries/tickets.queries";
import assert from "assert";
import { Type as T } from "@sinclair/typebox";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

const body = T.Object({
  customerId: T.String(),
  subject: T.String(),
  text: T.String(),
});

const response = T.Object({
  id: T.Number(),
  subject: T.String(),
  status: T.Union([
    T.Literal("unresolved"),
    T.Literal("resolved"),
  ]),
  customerId: T.String(),
  createdAt: T.String({ format: "date-time" }),
  closedAt: T.Optional(T.String({ format: "date-time" })),
});

export async function routeCreateTicket(instance: FastifyInstance) {
  instance.withTypeProvider<TypeBoxTypeProvider>().route({
    method: "POST",
    url: "/tickets",
    schema: {
      body,
      response: { 200: response },
    },
    handler: async (req) => {
      const { customerId, subject, text } = req.body;
      assert.ok(instance.db);
      const tickets = await createTicket.run({
        subject,
        customerId,
        senderType: "customer",
        senderId: customerId,
        text,
      }, instance.db);
      assert.ok(tickets.length === 1);
      const [{ id, subject: ticketSubject, status, createdAt }] = tickets;
      return {
        id,
        subject: ticketSubject,
        status,
        customerId,
        createdAt: createdAt.toISOString(),
      };
    }
  })
}
