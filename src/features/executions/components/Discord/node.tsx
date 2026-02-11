"use client";

import { Node, NodeProps, useReactFlow } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseExecutionNode } from "../base-execution-node";
import { useNodeStatus } from "../../hooks/use-node-status";
import { DISCORD_CHANNEL_NAME } from "@/inngest/channels/discord";
import { DiscordDialog, DiscordFormValues } from "./dialog";
import { fetchDiscordRealtimeToken } from "./action";

type DiscordNodeData = {
  webhookUrl?: string;
  content?: string;
  username?: string;
  variableName?: string;
};

type DiscordNodeType = Node<DiscordNodeData>;

export const DiscordNode = memo((props: NodeProps<DiscordNodeType>) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const nodeData = props.data;
  const description = nodeData?.content
    ? `Send: ${nodeData.content.slice(0, 50)}...`
    : "Not Configured";

  const handleOpenSettings = () => setDialogOpen(true);
  const { setNodes } = useReactFlow();

  const handleSubmit = (values: DiscordFormValues) => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === props.id) {
          return {
            ...node,
            data: {
              ...node.data,
              ...values,
            },
          };
        }
        return node;
      }),
    );
  };

  const status = useNodeStatus({
    nodeId: props.id,
    // can use the string from the channel as well
    channel: DISCORD_CHANNEL_NAME,
    topic: "status",
    refreshToken: fetchDiscordRealtimeToken,
  });
  return (
    <>
      <DiscordDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        defaultValues={nodeData}
        onSubmit={handleSubmit}
      />
      <BaseExecutionNode
        {...props}
        id={props.id}
        icon={"/discord.svg"}
        name="Discord Node"
        description={description}
        status={status}
        onSetting={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
      />
    </>
  );
});

DiscordNode.displayName = "DiscordNode";
