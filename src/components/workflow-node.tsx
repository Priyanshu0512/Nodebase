"use client";

import { NodeToolbar, Position } from "@xyflow/react";
import { Button } from "./ui/button";
import { SettingsIcon, TrashIcon } from "lucide-react";

interface WorkflowNodeProps {
  children: React.ReactNode;
  name?: string;
  onDelete?: () => void;
  onSetting?: () => void;
  showToolbar?: boolean;
  description?: string;
}

export function WorkflowNode({
  children,
  name,
  onDelete,
  onSetting,
  showToolbar = true,
  description,
}: WorkflowNodeProps) {
  return (
    <>
      {showToolbar && (
        <NodeToolbar>
          <Button size={"sm"} variant={"ghost"} onClick={onSetting}>
            <SettingsIcon className="size-4" />
          </Button>
          <Button size={"sm"} variant={"ghost"} onClick={onDelete}>
            <TrashIcon className="size-4" />
          </Button>
        </NodeToolbar>
      )}
      {children}
      {name && (
        <NodeToolbar
          position={Position.Bottom}
          isVisible
          className="text-center max-w-50"
        >
          <p className="font-medium">{name}</p>
          {description && (
            <p className="text-muted-foreground truncate text-sm">
              {description}
            </p>
          )}
        </NodeToolbar>
      )}
    </>
  );
}
