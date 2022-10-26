// import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const noteRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.note.findMany({
      where: {
        userId: ctx.session?.user?.id,
      },
    });
  }),

  createOne: publicProcedure
    .input(
      z.object({
        title: z.string(),
        body: z.string(),
        type: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user?.id;

      if (!userId) {
        return;
      }

      try {
        const note = await ctx.prisma.note.create({
          data: {
            title: input.title,
            body: input.body,
            type: input.type,
            userId: userId,
          },
        });
        return note;
      } catch (error) {
        console.log(error);
      }
    }),
});

// export const exampleRouter = router({
//   hello: publicProcedure
//     .input(z.object({ text: z.string().nullish() }).nullish())
//     .query(({ input }) => {
//       return {
//         greeting: `Hello ${input?.text ?? "world"}`,
//       };
//     }),

//   getAll: publicProcedure.query(({ ctx }) => {
//     return ctx.prisma.example.findMany();
//   }),
// });
