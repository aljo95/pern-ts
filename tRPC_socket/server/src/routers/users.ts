import { observable } from "@trpc/server/observable";
//autocomplete gives server/dist/observable
import { t } from "../trpc";
import { z } from "zod";
import { EventEmitter } from "stream";

/* Before Zod!
const userProcedure = t.procedure.input(v => {
    if (typeof v === "string") return v
    throw new Error("Invalid input in users.ts procedure def.")
})*/

const userProcedure = t.procedure.input(z.object({ userId: z.string() }));
const eventEmitter = new EventEmitter();

export const userRouter = t.router({
  //getUser: t.procedure.query(() => {
  // here input is gathered through the procedure
  // instead of having to write it here and bloat the method
  get: userProcedure.query(({ input }) => {
    return { id: input.userId, name: "user-name-1" };
  }),
  update: userProcedure
    .input(z.object({ name: z.string() }))
    //output type if needed, other things like pw: "myPW" will be ignored
    .output(z.object({ id: z.string(), name: z.string() }))
    .mutation((req) => {
      //now we are printing the full req because we added that to
      //context on server.ts
      console.log(req.ctx.isAdmin);
      console.log(
        "updating user " +
          req.input.userId +
          " to have the name " +
          req.input.name
      );
      eventEmitter.emit("update", req.input.userId);
      return { id: req.input.userId, name: req.input.name };
    }),
  //webbsocket, a procedure like any, subscription = socket
  onUpdate: t.procedure.subscription(() => {
    return observable<string>((emit) => {
      eventEmitter.on("update", emit.next);

      //on closing socket
      return () => {
        eventEmitter.off("update", emit.next);
      };
    });
  }),
});
