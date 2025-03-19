import { z } from "zod";
import { Button, Modal } from "../shared";
import { TaskForm, formSchema } from "./task-form";
import { useState } from "react";

type Props = {
  onSubmit: (args: z.infer<typeof formSchema>) => Promise<void> | void;
  closeAfterSubmit?: boolean;
};

export function TaskFormModal(props: Props) {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    await props.onSubmit(data);
    if (props.closeAfterSubmit) {
      setOpen(false);
    }
  };

  return (
    <Modal.Content
      open={open}
      updateOpen={setOpen}
      buttonText="open modal"
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
        <Button type="submit" form="task-form">
          Submit
        </Button>
      </Modal.Footer>
    </Modal.Content>
  );
}
