import { binding } from "cf-bindings-proxy";

export const db: D1Database = process.env.DB as any as D1Database ?? binding<D1Database>("DB");
