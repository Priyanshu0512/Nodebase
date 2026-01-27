"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import { memo } from "react";

export const AddNodeButton = memo(() => {
  return (
    <Button
      onClick={() => {}}
      size={"sm"}
      variant={"outline"}
      className="bg-background"
    >
      <PlusIcon />
    </Button>
  );
});

AddNodeButton.displayName = "AddButtonComponent";
