
import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import 'dotenv/config';
import cors from 'cors';
import superjson from 'superjson';
import { greetingInputSchema } from './schema';
import { getHello } from './handlers/get_hello';
import { createGreeting } from './handlers/create_greeting';
import { getGreetings } from './handlers/get_greetings';

const t = initTRPC.create({
  transformer: superjson,
});

const publicProcedure = t.procedure;
const router = t.router;

const appRouter = router({
  healthcheck: publicProcedure.query(() => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }),
  hello: publicProcedure
    .query(() => getHello()),
  createGreeting: publicProcedure
    .input(greetingInputSchema)
    .mutation(({ input }) => createGreeting(input)),
  getGreetings: publicProcedure
    .query(() => getGreetings()),
});

export type AppRouter = typeof appRouter;

async function start() {
  const port = process.env['SERVER_PORT'] || 2022;
  const server = createHTTPServer({
    middleware: (req, res, next) => {
      cors()(req, res, next);
    },
    router: appRouter,
    createContext() {
      return {};
    },
  });
  server.listen(port);
  console.log(`TRPC server listening at port: ${port}`);
}

start();
