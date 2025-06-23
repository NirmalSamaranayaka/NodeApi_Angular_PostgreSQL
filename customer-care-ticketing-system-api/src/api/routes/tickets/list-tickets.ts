import { FastifyInstance } from "fastify";
import { listTickets } from "../../../queries/tickets.queries";
import assert from "assert";
import { Type as T } from "@sinclair/typebox";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

const response = T.Object({
  data: T.Array(
    T.Object({
      id: T.Number(),
      subject: T.String(),
      status: T.Union([
        T.Literal("unresolved"),
        T.Literal("resolved"),
      ]),
      customerId: T.String(),
      createdAt: T.String({ format: "date-time" }),
      closedAt: T.Optional(T.String({ format: "date-time" })),
    })
  )
});

const querystring = T.Object({
  status: T.Optional(T.Union([
    T.Literal("unresolved"),
    T.Literal("resolved"),
  ]))
})

export async function routeListTickets(instance: FastifyInstance) {
  instance.withTypeProvider<TypeBoxTypeProvider>().route({
    method: "GET",
    url: "/tickets",
    schema: {
      querystring,
      response: { 200: response },
    },
    handler: async (req) => {
      assert.ok(instance.db);
      const tickets = await listTickets.run({
        status: req.query.status,
      }, instance.db);
      return {
        data: tickets.map(t => ({
          id: t.id,
          subject: t.subject,
          status: t.status,
          customerId: t.customerId,
          createdAt: t.createdAt.toISOString(),
          closedAt: t.closedAt?.toISOString(),
        }))
      }
    }
  })
}
