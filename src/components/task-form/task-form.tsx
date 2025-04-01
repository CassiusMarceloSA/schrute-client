import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button, Input, Textarea } from "../shared";
import { WandSparkles } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { aiService } from "@/services";

const DEFAULT_DURATION = 15;

export const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  duration: z.coerce.number().min(1, "Duration is required"),
});

export type FormProps = {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  isAdding?: boolean;
} & Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit">;

export const TaskForm = ({ isAdding, ...props }: FormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      duration: DEFAULT_DURATION,
    },
    reValidateMode: "onSubmit"
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    props.onSubmit(values);
  }

  function getFieldError(fieldName: keyof typeof formSchema.shape) {
    const fieldError = form.formState.errors[fieldName];
    return fieldError?.message;
  }

  const { mutate: aiGenerateMutation, isPending: isAiGenerating } = useMutation(
    {
      mutationFn: () =>
        aiService.getAiResponse(form.watch("description"), form.watch("title")),
      onSuccess: (data) => {
        form.setValue("description", data);
      },
    }
  );

  const isEnhanceDisabled = !form.watch("title") || isAiGenerating;

  return (
    <>
      <form
        {...props}
        noValidate
        id="task-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <Input
          {...form.register("title")}
          error={getFieldError("title")}
          label="Title"
          placeholder="Enter task title"
          disabled={isAdding}
        />
        <div>
          <Textarea
            {...form.register("description")}
            error={getFieldError("description")}
            label="Description"
            placeholder="Enter task description"
            disabled={isAdding || isAiGenerating}
          />
          <Button
            className="px-0"
            onClick={() => aiGenerateMutation()}
            disabled={isEnhanceDisabled}
          >
            <WandSparkles />
            Enhance text
          </Button>
        </div>
        <Input
          {...form.register("duration")}
          error={getFieldError("duration")}
          type="number"
          min={1}
          label="Duration (minutes)"
          placeholder="Enter task duration"
          disabled={isAdding}
        />
      </form>
    </>
  );
};
