"use client";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const page = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data } = useQuery(trpc.getWorkflows.queryOptions());

  console.log(data);

  const create = useMutation(
    trpc.createWorkflow.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.getWorkflows.queryOptions());
      },
    })
  );

  const testai = useMutation(
    trpc.testai.mutationOptions({
      onSuccess: () => {
        toast.success("Job queued.");
      },
    })
  );

  return (
    <div className="flex flex-col items-center justify-center">
      hi
      {JSON.stringify(data, null, 2)}
      <Button disabled={create.isPending} onClick={() => create.mutate()}>
        create workflow
      </Button>
      <Button disabled={testai.isPending} onClick={() => testai.mutate()}>
        test ai
      </Button>
    </div>
  );
};

export default page;
