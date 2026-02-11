import { MousePointerIcon } from "lucide-react";
import { BaseTriggerNode } from "../base-trigger-node";
import { memo, useState } from "react";
import { NodeProps } from "@xyflow/react";
import { ManualTriggerDialog } from "./dialog";
import { useNodeStatus } from "@/features/executions/hooks/use-node-status";
import {
  MANUAL_TRIGGER_CHANNEL_NAME,
  manualTriggerChannel,
} from "@/inngest/channels/manual-trigger";
import { fetchManualTriggerRealtimeToken } from "./action";

export const ManualTriggerNode = memo((props: NodeProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenSettings = () => setDialogOpen(true);
  const nodeStatus = useNodeStatus({
    nodeId: props.id,
    // can use the string from the channel as well
    channel: MANUAL_TRIGGER_CHANNEL_NAME,
    topic: "status",
    refreshToken: fetchManualTriggerRealtimeToken,
  });

  return (
    <>
      <ManualTriggerDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      <BaseTriggerNode
        {...props}
        icon={MousePointerIcon}
        name="When clicking execute workflow"
        status={nodeStatus}
        onSetting={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
      />
    </>
  );
});
