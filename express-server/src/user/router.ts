/*
 create functions for getUsers, getUserById and createUser 
 with a query (read) or mutation (write).
*/

import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { users } from "./db";
import { User } from "./types";
import { db } from "../pgdb";

export const userRouter = router({
  getUsers: publicProcedure.query(async () => {
    let db_users: any;
    let res: { name: string; age: number; id: number }[];
    try {
      db_users = await db.pool.query("SELECT * FROM users;");
      res = db_users.rows;
      console.log(res);
      return res;
    } catch {
      console.log("db query failed :(");
      return "failed query";
    }
    //return users;
  }),

  getUserById: publicProcedure
    .input(
      z
        .object({
          text: z.string().nullish(),
        })
        .nullish()
    )
    .query((req: any) => {
      console.log("yayayaya");
      const reqInput = req.input.text;
      let user: string = "";
      for (let i = 0; i < users.length; i++) {
        if (users[i].id === reqInput) {
          user = users[i].name;
          break;
        }
      }
      //console.log("user: " + user);
      //if (typeof user !== "string") return;

      return user;
    }),

  createUser: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation((req) => {
      const { input } = req;

      const user: User = {
        id: `${Math.random()}`,
        name: input.name,
      };
      users.push(user);
      return user;
    }),
  greetings: publicProcedure
    .input(
      z.object({
        msg: z.string().optional(),
      })
    )
    .query(({ input }) => {
      return {
        msg: "hello " + input.msg,
      };
    }),
});
