import { adminProcedure, t } from "../trpc";
import { userRouter } from "./users";

export const appRouter = t.router({
  sayHi: t.procedure.query(() => {
    return "hello from sayHi trpc route/method";
  }),
  logToServer: t.procedure
    .input((v) => {
      if (typeof v === "string") return v;
      throw new Error("INVALID INPUT - NOT STRING!");
    })
    .mutation((req): boolean => {
      console.log(`client sent string: ${req.input}`);
      return true;
    }),
  users: userRouter,
  // if successful then next() is the query function
  secretData: adminProcedure.query(({ ctx }) => {
    console.log(ctx.user);
    return "return from adminProcedure route";
  }),
});

//merge routers:
//export const  mergedRouter = t.mergeRouters(appRouter, userRouter)
