import { z } from "zod";
import { Button, Modal } from "../shared";
import { TaskForm, formSchema } from "./task-form";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { ColumnEnum } from "@/models";

type Props = {
  onSubmit: (
    args: z.infer<typeof formSchema> & { status: ColumnEnum }
  ) => Promise<void> | void;
  closeAfterSubmit?: boolean;
  isAdding?: boolean;
};

export function TaskFormModal(props: Props) {
  const [open, setOpen] = useState(false);
  const [shouldClose, setShouldClose] = useState(false);

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    await props.onSubmit({ ...data, status: "backlog" });
    if (props.closeAfterSubmit) {
      setShouldClose(true);
    }
  };

  useEffect(() => {
    if (!props.isAdding && shouldClose) {
      setOpen(false);
    }
  }, [props.isAdding, shouldClose]);

  return (
    <Modal.Content
      open={open}
      updateOpen={setOpen}
      buttonContent={
        <>
          <Plus size={12} />
          Add new task
        </>
      }
      title="Task form"
      description="Include data to add new task"
    >
      <TaskForm onSubmit={handleSubmit} />
      <Modal.Footer className="sm:justify-between">
        <Modal.Close asChild>
          <Button type="button" variant="ghost">
            Back
          </Button>
        </Modal.Close>
        <Button variant="secondary" type="submit" form="task-form">
          Submit
        </Button>
      </Modal.Footer>
    </Modal.Content>
  );
}
