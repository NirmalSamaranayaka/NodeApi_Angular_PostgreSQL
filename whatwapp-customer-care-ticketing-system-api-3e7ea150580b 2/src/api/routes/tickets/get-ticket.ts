import { FastifyInstance } from "fastify";
import { getTicket } from "../../../queries/tickets.queries";
import assert from "assert";
import { Type as T } from "@sinclair/typebox";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { NotFound } from "http-errors";

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

const params = T.Object({
  id: T.Number(),
})

export async function routeGetTicket(instance: FastifyInstance) {
  instance.withTypeProvider<TypeBoxTypeProvider>().route({
    method: "GET",
    url: "/tickets/:id",
    schema: {
      params: params,
      response: { 200: response },
    },
    handler: async (req) => {
      assert.ok(instance.db);
      const { id: ticketId } = req.params;
      const tickets = await getTicket.run({
        id: ticketId
      }, instance.db);
      if (tickets.length === 0) {
        throw new NotFound("Ticket does not exist");
      }
      assert.ok(tickets.length === 1);
      const [{ id, subject, status, customerId, createdAt, closedAt }] = tickets;
      return {
        id,
        subject,
        status,
        customerId,
        createdAt: createdAt.toISOString(),
        closedAt: closedAt?.toISOString()
      };
    }
  })
}
