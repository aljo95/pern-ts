import { TRPCError, inferAsyncReturnType, initTRPC } from "@trpc/server";
import { createContext } from "./context";

export const t = initTRPC
  .context<inferAsyncReturnType<typeof createContext>>()
  .create();

const isAdminMiddleware = t.middleware(({ ctx, next }) => {
  if (!ctx.isAdmin) throw new TRPCError({ code: "UNAUTHORIZED" });

  //overwriting context by passing it to next()
  //if we just return next() then we would have no context change
  return next({ ctx: { user: { id: 1 } } });
});

//using adminProcedure now will let it be ONLY available for admins
export const adminProcedure = t.procedure.use(isAdminMiddleware);
