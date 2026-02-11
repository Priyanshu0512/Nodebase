import { Inngest } from "inngest";
import { realtimeMiddleware } from "@inngest/realtime/middleware";

export const inngest = new Inngest({
  id: "nodebase",
  // Required so we can send events to Inngest in production.
  // Set INNGEST_EVENT_KEY in your environment (locally and on Vercel).
  eventKey: process.env.INNGEST_EVENT_KEY,
  middleware: [realtimeMiddleware()],
});
