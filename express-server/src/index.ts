import dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response } from "express";
import path from "path";
import cors from "cors";

import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./router";
import { createContext } from "./context";

const app: Express = express();

app.use(cors());

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World From the Typescript Server!");
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export type AppRouter = typeof appRouter;
