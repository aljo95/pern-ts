// src/index.js
import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

import { applyWSSHandler } from "@trpc/server/adapters/ws";
import { appRouter } from "./routers/index";
import { createContext } from "./context";
import ws from "ws";

dotenv.config();

const app: Express = express();
app.use(cors({ origin: "http://127.0.0.1:5173" }));
/* EXPRESS tRPC ADAPTER */
app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  console.log("root route");
  res.send("Express + TypeScript Server!");
});

const server = app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

//wss = web socket server
applyWSSHandler({
  wss: new ws.Server({ server }),
  router: appRouter,
  createContext,
});

export type AppRouter = typeof appRouter;
