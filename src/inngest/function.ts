import prisma from "@/lib/db";
import { inngest } from "./client";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";

const anthropic = createAnthropic();
const openai = createOpenAI();
const google = createGoogleGenerativeAI();

export const execute = inngest.createFunction(
  { id: "execute-ai" },
  {
    event: "execute/ai",
  },
  async ({ event, step }) => {
    await step.sleep("sleeping", "5s");
    const { steps: geminiSteps } = await step.ai.wrap(
      "gemini-generate-text",
      generateText,
      {
        model: google("gemini-2.5-flash"),
        system: "You are a helpful assistand",
        prompt: "What's 2+2?",
      }
    );
    const { steps: openAiSteps } = await step.ai.wrap(
      "openai-generate-text",
      generateText,
      {
        model: openai("gpt-4.1-mini"),
        system: "You are a helpful assistand",
        prompt: "What's 2+2?",
      }
    );
    const { steps: anthropicSteps } = await step.ai.wrap(
      "anthropic-generate-text",
      generateText,
      {
        model: anthropic("claude-3-5-sonnet"),
        system: "You are a helpful assistand",
        prompt: "What's 2+2?",
      }
    );
    return {
      geminiSteps,
      openAiSteps,
      anthropicSteps,
    };
  }
);
