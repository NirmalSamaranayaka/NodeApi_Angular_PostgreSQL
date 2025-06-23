import { FastifyInstance } from "fastify";
import assert from "assert";
import { Type as T } from "@sinclair/typebox";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { getMessagesByTicket } from "../../../queries/messages.queries";

const response = T.Object({
  data: T.Array(
    T.Object({
      id: T.Number(),
      senderType: T.Union([
        T.Literal("customer"),
        T.Literal("operator"),
      ]),
      senderId: T.String(),
      text: T.String(),
      createdAt: T.String({ format: "date-time" }),
    })
  )
});

const params = T.Object({
  ticketId: T.Number(),
})

export async function routeListTicketMessages(instance: FastifyInstance) {
  instance.withTypeProvider<TypeBoxTypeProvider>().route({
    method: "GET",
    url: "/tickets/:ticketId/messages",
    schema: {
      params,
      response: { 200: response },
    },
    handler: async (req) => {
      const { ticketId } = req.params;
      assert.ok(instance.db);
      const messages = await getMessagesByTicket.run({
        ticketId,
      }, instance.db);
      const [{ createdAt, ...message }] = messages;
      return {
        data: messages.map(({ id, senderType, senderId, text, createdAt }) => ({
          id, senderType, senderId, text,
          createdAt: createdAt.toISOString(),
        }))
      };
    }
  })
}
