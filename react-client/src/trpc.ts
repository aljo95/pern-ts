import { createTRPCReact, httpBatchLink } from '@trpc/react-query';

import type { AppRouter } from '../../express-server/src/index'

export const trpc: any = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
    links: [
      httpBatchLink({
        url: 'http://localhost:8000/trpc',
      }),
    ],
  });