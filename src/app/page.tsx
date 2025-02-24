"use client";

import { Button, Input } from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  duration: number;
};

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  duration: z.coerce.number().min(1, "Duration is required"),
});

const Form = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      duration: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  function getFieldError(fieldName: keyof typeof formSchema.shape) {
    const fieldError = form.formState.errors[fieldName];
    return fieldError?.message;
  }

  return (
    <form noValidate id="task-form" onSubmit={form.handleSubmit(onSubmit)}>
      <Input
        {...form.register("title")}
        error={getFieldError("title")}
        label="Title"
      />
      <Input
        {...form.register("description")}
        error={getFieldError("description")}
        label="Description"
      />
      <Input
        {...form.register("duration")}
        error={getFieldError("duration")}
        type="number"
        min={1}
        label="Duration (minutes)"
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default function Home() {
  return (
    <div className="flex flex-row items-center justify-center font-[family-name:var(--font-geist-sans)]">
      <Form />
    </div>
  );
}
