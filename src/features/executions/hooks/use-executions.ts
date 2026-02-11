import { ExecutionStatus } from "@/generated/prisma/enums";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useExecutionsParams } from "./use-executions-params";

const REFETCH_WHEN_RUNNING_MS = 2_000;
const REFETCH_WHEN_IDLE_MS = 10_000;

export const useSuspenseExecutions = () => {
  const trpc = useTRPC();
  const [params] = useExecutionsParams();
  return useSuspenseQuery({
    ...trpc.executions.getMany.queryOptions(params),
    refetchInterval: (query) => {
      const items = query.state.data?.items ?? [];
      const hasRunning = items.some(
        (e) => e.status === ExecutionStatus.RUNNING,
      );
      return hasRunning ? REFETCH_WHEN_RUNNING_MS : REFETCH_WHEN_IDLE_MS;
    },
  });
};
export const useSuspenseExecution = (id: string) => {
  const trpc = useTRPC();
  return useSuspenseQuery(trpc.executions.getOne.queryOptions({ id }));
};
