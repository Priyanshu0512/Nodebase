import { createTRPCRouter } from "../init";
import { workflowsRouter } from "@/features/workflows/server/router";

export const appRouter = createTRPCRouter({
  workflows: workflowsRouter,
});
