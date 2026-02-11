import { createAuthClient } from "better-auth/react";
import { polarClient } from "@polar-sh/better-auth";
import { organizationClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  // When baseURL is omitted, better-auth will use the current origin.
  // This works both locally (http://localhost:3000) and in production
  // (e.g. your Vercel URL) without hard-coding a host.
  plugins: [polarClient()],
});
