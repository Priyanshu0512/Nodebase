import { NodeType } from "@/generated/prisma/enums";
import { NodeExecutor } from "../types";
import { manualTriggerExecutor } from "@/features/triggers/components/manual-trigger/executor";
import { httpRequestExecutor } from "../components/http-request/executor";
import { googleFormTriggerExecutor } from "@/features/triggers/components/google-form-trigger/executor";
import { stripeTriggerExecutor } from "@/features/triggers/components/stripe-trigger/executor";
import { anthropicExecutor } from "../components/Anthropic/executor";
import { geminiExecutor } from "../components/Gemini/executor";
import { openaiExecutor } from "../components/Openai/executor";
export const executorRegistry: Record<NodeType, NodeExecutor> = {
  [NodeType.HTTP_REQUEST]: httpRequestExecutor,
  [NodeType.INITIAL]: manualTriggerExecutor,
  [NodeType.MANUAL_TRIGGER]: manualTriggerExecutor,
  [NodeType.GOOGLE_FORM_TRIGGER]: googleFormTriggerExecutor,
  [NodeType.STRIPE_TRIGGER]: stripeTriggerExecutor,
  [NodeType.ANTHROPIC]: anthropicExecutor,
  [NodeType.GEMINI]: geminiExecutor,
  [NodeType.OPENAI]: openaiExecutor,
};

export const getExecutor = (type: NodeType): NodeExecutor => {
  const executor = executorRegistry[type];
  if (!executor) {
    throw new Error(`No executor found for this node type:${type}`);
  }

  return executor;
};
