import { api } from "./api";
// import { whenProcessExit } from "./lib/process/when-process-exit";
import fastify from "fastify";
import { env } from "./lib/env";
import { once } from "events";
import fastifyCors from "@fastify/cors";

(async function () {
  const server = fastify({
    logger: { level: "debug" },
  })
    .register(fastifyCors)
    .register(api, {
      prefix: "/api/v1",
      db: {
        host: env.PGHOST,
        port: env.PGPORT,
        user: env.PGUSER,
        password: env.PGPASSWORD,
        database: env.PGDATABASE,
      },
    });
  try {
    await server.listen({ host: "0.0.0.0", port: 8000 });
    await Promise.race([
      once(process, "SIGINT"),
      once(process, "SIGTERM"),
    ]);
    server.log.info("Terminating...");
    await server.close();
  } catch (error) {
    server.log.error(error)
    process.exit(1);
  }
})();
