import { MousePointerIcon } from "lucide-react";
import { BaseTriggerNode } from "../base-trigger-node";
import { memo } from "react";
import { NodeProps } from "@xyflow/react";

export const ManualTriggerNode = memo((props: NodeProps) => {
  return (
    <>
      <BaseTriggerNode
        {...props}
        icon={MousePointerIcon}
        name="When clicking execute workflow"
        // status={nodeStatus}
        // onSetting={handleOpenSettings}
        // onDoubleClick={handledoubleclick}
      />
    </>
  );
});
