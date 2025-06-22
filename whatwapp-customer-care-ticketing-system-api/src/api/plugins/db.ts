import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import * as pg from "pg";

declare module "fastify" {
  interface FastifyInstance {
    db?: pg.Pool;
  }
}

export const db = fp(async (instance: FastifyInstance, opts: pg.PoolConfig) => {
  const db = new pg.Pool(opts);
  await db.query("SELECT 1");
  instance.log.info("Connected to database");
  instance
    .decorate("db", db)
    .addHook("onClose", () => db.end());
});
