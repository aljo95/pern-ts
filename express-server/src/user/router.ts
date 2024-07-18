/*
 create functions for getUsers, getUserById and createUser 
 with a query (read) or mutation (write).
*/

import { z } from 'zod'
import { router, publicProcedure } from '../trpc'
import { users } from './db'
import { User } from './types'

export const userRouter = router({
    

    getUsers: publicProcedure.query(() => {
        return users
    }),

    getUserById: publicProcedure.input((val: unknown) => {
        if (typeof val === 'string') return val
        throw new Error(`Invalid input: ${typeof val}`)
    }).query((req: any) => {
        const reqInput = req.input
        let user: any = ""
        for (let i=0; i<users.length; i++) {
            if (users[i].id === reqInput) {
                user = users[i]
                break
            }
        }
        return user
    }),

    createUser: publicProcedure
     .input(z.object({ name: z.string() }))
     .mutation((req) => {
            const { input } = req
            
            const user: User = {
                id: `${Math.random()}`,
                name: input.name,
            }
            users.push(user)
            return user
    })
})