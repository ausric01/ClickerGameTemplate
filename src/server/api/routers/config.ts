import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { Config } from "@prisma/client";

export const configRouter = createTRPCRouter({
  update: publicProcedure
    .input(
      z.object({
        config: z.object({
          id: z.string(),
          user_id: z.string(),
          balance: z.number(),
          increment: z.number(),
          autoclickers: z.number(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        //@ts-ignore
        const config = input.config;
        const res = await ctx.prisma.config.update({
          data: {
            balance: config.balance,
            increment: config.increment,
            autoclickers: config.autoclickers,
          },
          where: {
            id: config.id,
          },
        });
        return {
          result: res,
        };
      } catch (error: any) {
        return {
          result: null,
          error,
        };
      }
    }),
});
