import format from "@/utils/date-formatter";
import { Button, Modal } from "../shared";
import { Task } from "@/models";

type Props = {
  task: Task | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function TaskModal({ task, open, onOpenChange }: Props) {
  if (!task) return null;

  return (
    <Modal.Content
      open={open}
      updateOpen={onOpenChange}
      title={task.title}
      description={`At ${task.status} column`}
    >
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium">Description</h3>
          <p className="text-sm text-muted-foreground">{task.description}</p>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium">Status</h3>
          <p className="text-sm text-muted-foreground capitalize">
            {task.status}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium">Created At</h3>
          <p className="text-sm text-muted-foreground">
            {format(task.createdAt)}
          </p>
        </div>

        {task.updatedAt && (
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">Last Updated</h3>
            <p className="text-sm text-muted-foreground">
              {format(task.updatedAt)}
            </p>
          </div>
        )}
      </div>

      <Modal.Footer className="sm:justify-end">
        <Modal.Close asChild>
          <Button type="button" variant="ghost">
            Close
          </Button>
        </Modal.Close>
      </Modal.Footer>
    </Modal.Content>
  );
}
