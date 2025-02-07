import { Hono } from "hono";
import { handle } from "hono/vercel";

import user from "./user";
import sections from "./sections";

export const runtime = "edge";

const app = new Hono().basePath("/api");

const route = app.route("/user", user).route("/sections", sections);

export const GET = handle(app);
export const POST = handle(app);
export const DELETE = handle(app);
export const PATCH = handle(app);

export type AppType = typeof route;
