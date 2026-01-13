import { inngest } from "@/inngest/client";
import {
  baseProcedure,
  createTRPCRouter,
  premiumProcedure,
  protectedProcedure,
} from "../init";
import prisma from "@/lib/db";

export const appRouter = createTRPCRouter({
  testai: baseProcedure.mutation(async () => {
    await inngest.send({
      name: "execute/ai",
    });
    return {
      success: true,
      message: "AI executed",
    };
  }),
  getWorkflows: protectedProcedure.query(({ ctx }) => {
    return prisma.workflow.findMany();
  }),
  createWorkflow: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "test/hello.world",
      data: {
        email: "helloWorld@gmail.com",
      },
    });
    return { success: true, message: "Workflow done." };
  }),
});
