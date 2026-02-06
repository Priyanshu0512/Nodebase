import type { NodeExecutor } from "@/features/executions/types";
import { stripeTriggerChannel } from "@/inngest/channels/stripe-trigger";

type StripeTriggerData = Record<string, unknown>;
export const stripeTriggerExecutor: NodeExecutor<StripeTriggerData> = async ({
  nodeId,
  context,
  step,
  publish,
}) => {
  console.log("at executor");
  await publish(
    stripeTriggerChannel().status({
      nodeId,
      status: "loading",
    }),
  );
  console.log("before step");
  const result = await step.run("stripe-trigger", async () => context);
  console.log("after step");
  await publish(
    stripeTriggerChannel().status({
      nodeId,
      status: "success",
    }),
  );
  return result;
};
