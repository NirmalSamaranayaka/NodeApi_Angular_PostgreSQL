import { FastifyInstance } from "fastify";
import { resolveTicket } from "../../../queries/tickets.queries";
import assert from "assert";
import { Type as T } from "@sinclair/typebox";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

const response = T.Object({
  id: T.Number(),
  subject: T.String(),
  status: T.Union([
    T.Literal("unresolved"),
    T.Literal("resolved"),
  ]),
  createdAt: T.String({ format: "date-time" }),
  closedAt: T.Optional(T.String({ format: "date-time" })),
});

const params = T.Object({
  id: T.Number(),
})

export async function routeResolveTicket(instance: FastifyInstance) {
  instance.withTypeProvider<TypeBoxTypeProvider>().route({
    method: "PUT",
    url: "/tickets/:id/resolve",
    schema: {
      params: params,
      response: { 200: response },
    },
    handler: async (req) => {
      assert.ok(instance.db);
      const { id: ticketId } = req.params;
      const tickets = await resolveTicket.run({
        id: ticketId
      }, instance.db);
      assert.ok(tickets.length === 1);
      const [{ id, subject, status, createdAt, closedAt }] = tickets;
      return {
        id,
        subject,
        status,
        createdAt: createdAt.toISOString(),
        closedAt: closedAt?.toISOString()
      };
    }
  })
}
