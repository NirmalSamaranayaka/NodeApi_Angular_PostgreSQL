import { FastifyInstance } from "fastify";
import { deleteTicket } from "../../../queries/tickets.queries";
import assert from "assert";
import { Type as T } from "@sinclair/typebox";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { NotFound } from "http-errors";

const response = T.Object({});

const params = T.Object({
  id: T.Number(),
})

export async function routeDeleteTicket(instance: FastifyInstance) {
  instance.withTypeProvider<TypeBoxTypeProvider>().route({
    method: "DELETE",
    url: "/tickets/:id",
    schema: {
      params: params,
      response: { 200: response },
    },
    handler: async (req) => {
      assert.ok(instance.db);
      const { id: ticketId } = req.params;
      const tickets = await deleteTicket.run({
        id: ticketId
      }, instance.db);
      if (tickets.length === 0) {
        throw new NotFound("Ticket does not exist");
      }
      assert.ok(tickets.length === 1);
      return {};
    }
  })
}
