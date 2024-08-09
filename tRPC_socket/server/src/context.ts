import { CreateExpressContextOptions } from "@trpc/server/adapters/express";

//export function createContext({ req, res }: CreateExpressContextOptions) {
export function createContext() {
  return {
    //req,
    //res,
    isAdmin: true,
  };
}
