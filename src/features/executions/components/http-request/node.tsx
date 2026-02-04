"use client";

import { Node, NodeProps, useReactFlow } from "@xyflow/react";
import { memo, useEffect, useState } from "react";
import { BaseExecutionNode } from "../base-execution-node";
import { GlobeIcon } from "lucide-react";
import { FormType, HttpRequestDialog } from "./dialog";

type HttpRequestNodeData = {
  endpoint?: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: string;
  [key: string]: unknown;
};

type HttpRequestNodeType = Node<HttpRequestNodeData>;

export const HttpRequestNode = memo((props: NodeProps<HttpRequestNodeType>) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const nodeData = props.data;
  const description = nodeData?.endpoint
    ? `${nodeData.method || "GET"}: ${nodeData.endpoint}`
    : "Not Configured";

  const handleOpenSettings = () => setDialogOpen(true);
  const { setNodes } = useReactFlow();

  const handleSubmit = (values: FormType) => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === props.id) {
          return {
            ...node,
            data: {
              ...node.data,
              endpoint: values.endpoint,
              method: values.method,
              body: values.body,
            },
          };
        }
        return node;
      }),
    );
  };

  const status = "initial";
  return (
    <>
      <HttpRequestDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        defaultBody={nodeData.body}
        defaultEndpoint={nodeData.endpoint}
        defaultMethod={nodeData.method}
        onSubmit={handleSubmit}
      />
      <BaseExecutionNode
        {...props}
        id={props.id}
        icon={GlobeIcon}
        name="HTTP Request"
        description={description}
        status={status}
        onSetting={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
      />
    </>
  );
});

HttpRequestNode.displayName === "HttpRequestNode";
