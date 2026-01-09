import prisma from "@/lib/db";
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("fetching", "3s");
    await step.sleep("transcibing", "3s");
    await step.sleep("transcription", "3s");

    await step.run("create-worflow", async () => {
      await prisma.workflow.create({
        data: {
          name: "workflow from inngest",
        },
      });
    });
    return { message: `Hello ${event.data.email}!` };
  }
);
