"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCredentialsByType } from "@/features/credentials/hooks/use-credentials";
import { CredentialType } from "@/generated/prisma/enums";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

export const AVAILABLE_MODELS = [
  // "Openai-1.5-flash",
  // "Openai-2-flash",
  "gpt-4.1-mini",
  // "Openai-1.5-flash-8b",
  // "Openai-1.5-pro",
  // "Openai-1.0-pro",
  // "Openai-pro",
] as const;

const formSchema = z.object({
  variableName: z
    .string()
    .min(1, { message: "Variable name is required" })
    .regex(/^[A-Za-z_$][A-Za-z0-9_$]*$/, {
      message:
        "Variable name must start with a letter or underscore and should contain only letters, numbers and underscores.",
    }),

  credentialId: z.string().min(1, "Credentials are required"),
  model: z.string().min(1, "Model is required"),
  systemPrompt: z.string().optional(),
  userPrompt: z.string().min(1, "User prompt is required"),
});

export type OpenaiFormValues = z.infer<typeof formSchema>;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultValues: Partial<OpenaiFormValues>;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}

export const OpenaiDialog = ({
  open,
  onOpenChange,
  defaultValues = {},
  onSubmit,
}: Props) => {
  const { data: credentials, isLoading: isLoadingCredentials } =
    useCredentialsByType(CredentialType.OPENAI);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      variableName: defaultValues.variableName || "",
      credentialId: defaultValues.credentialId || "",
      model: defaultValues.model || AVAILABLE_MODELS[0],
      systemPrompt: defaultValues.systemPrompt || "",
      userPrompt: defaultValues.userPrompt || "",
    },
  });

  const watchVariableName = form.watch("variableName") || "myOpenai";

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
    onOpenChange(false);
  };

  useEffect(() => {
    if (open) {
      form.reset({
        variableName: defaultValues.variableName || "",
        credentialId: defaultValues.credentialId || "",
        model: defaultValues.model || AVAILABLE_MODELS[0],
        systemPrompt: defaultValues.systemPrompt || "",
        userPrompt: defaultValues.userPrompt || "",
      });
    }
  }, [open, defaultValues, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="flex items-center ">
          <DialogTitle>Openai</DialogTitle>
          <DialogDescription>
            Configure the AI model and prompts for this node.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8 mt-4"
          >
            <FormField
              control={form.control}
              name={"variableName"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Variable Name </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="myOpenai" />
                  </FormControl>
                  <FormDescription>
                    Use this name to reference the result in other nodes{" "}
                    {`{{${watchVariableName}.text}}`}
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"credentialId"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>OpenAI Credentials</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isLoadingCredentials || !credentials?.length}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a credential" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {credentials?.map((credential) => (
                        <SelectItem key={credential.id} value={credential.id}>
                          <div className="flex items-center gap-2">
                            <Image
                              src={"/openai.svg"}
                              alt={"OpenAI"}
                              width={16}
                              height={16}
                            />
                            {credential.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"model"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Model </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a model" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {AVAILABLE_MODELS.map((model) => (
                        <SelectItem key={model} value={model}>
                          {model}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    The Openai model to use for completion
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"systemPrompt"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel> System Prompt (Optional) </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="You are a helpful assistant."
                      className="min-h-[80px] font-mono text-sm"
                    />
                  </FormControl>
                  <FormDescription>
                    Sets the behavior of the assistant. Use{"{{variable}}"} for
                    simple values or {"{{jsonvariable}}"} to stringify objects.
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"userPrompt"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel> User Prompt </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Summarize this text:{{json httpResponse.data}}"
                      className="min-h-[120px] font-mono text-sm"
                    />
                  </FormControl>
                  <FormDescription>
                    The prompt to send to the AI. Use {"{{variables}}"} for
                    simple values or {"{{jsonvariable}}"} to stringify objects.
                  </FormDescription>
                </FormItem>
              )}
            />
            <DialogFooter className="mt-4">
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
