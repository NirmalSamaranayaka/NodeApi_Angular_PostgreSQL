import { Pool } from "pg";
import { env } from "../lib/env";
import { readFile } from "fs/promises";
import path from "path";
import { seedTicket } from "../queries/seed.queries";

type Data = {
  ticketSubject: string;
  resolved: boolean;
  messages: { message: string, senderType: "customer" | "operator", createdAt: string; }[]
}

function shuffle<T>(array: T[]) {
  var m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

(async () => {
  const pool = new Pool({
    user: env.PGUSER,
    password: env.PGPASSWORD,
    database: env.PGDATABASE,
  });
  const file = await readFile(path.join(__dirname, "data.json"), "utf8");
  const rawData = JSON.parse(file) as Data[];
  const data = shuffle(rawData);
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("TRUNCATE tickets CASCADE");
    let userId = 0;
    for (const { ticketSubject: subject, resolved, messages } of data) {
      userId++;
      const customerId = `user${userId}@email.com`;
      const { createdAt } = messages[0];
      await seedTicket.run({
        subject,
        status: resolved ? "resolved" : "unresolved",
        customerId: customerId,
        created_at: new Date(createdAt),
        messages: messages.map(({ senderType, message, createdAt }) => ({
          senderType: senderType,
          senderId: senderType === "customer" ? `${userId}` : "operator1",
          createdAt: createdAt,
          text: message,
        }))
      }, client);
    }
    await client.query("COMMIT")
  } catch (e) {
    await client.query("ROLLBACK")
  } finally {
    client.release();
    console.log("Seed completed");
  }
})();
