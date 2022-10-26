// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { exampleRouter } from "./example";
import { authRouter } from "./auth";
import { noteRouter } from "./note";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  note: noteRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
