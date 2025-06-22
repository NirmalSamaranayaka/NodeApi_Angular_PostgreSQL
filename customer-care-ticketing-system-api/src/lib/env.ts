import envSchema from "env-schema"
import { Static, Type as T } from "@sinclair/typebox";

const schema = T.Object({
  PGHOST: T.String({ default: "localhost" }),
  PGPORT: T.Integer({ default: 5432 }),
  PGUSER: T.String({ default: "api" }),
  PGPASSWORD: T.String({ default: "apiPassword" }),
  PGDATABASE: T.String({ default: "api" }),
});

type Schema = Static<typeof schema>;

export const env = envSchema<Schema>({
  schema: schema,
  dotenv: true,
});
