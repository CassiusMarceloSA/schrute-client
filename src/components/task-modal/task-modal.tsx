import { ColumnEnum, Task } from "@/models";
import { TW_BOARD_COLORS } from "@/utils";
import format from "@/utils/date-formatter";
import { Calendar, CircleDashed, Text, Trash } from "lucide-react";
import { Button, Modal } from "../shared";

type Props = {
  task: Task | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
const BOARD_ORDER = ["backlog", "todo", "doing", "done"] satisfies ColumnEnum[];

export function TaskModal({ task, open, onOpenChange }: Props) {
  if (!task) return null;
  const color = TW_BOARD_COLORS[BOARD_ORDER.indexOf(task.status)].replace(
    "500",
    "700"
  );

  return (
    <Modal.Content
      open={open}
      updateOpen={onOpenChange}
      title={task.title}
      description={
        <>
          At <span className={`text-${color}`}>{task.status}</span> column
        </>
      }
    >
      <div className="grid grid-cols-3 gap-2">
        <div className="space-y-4 col-span-2">
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-medium flex items-center gap-2">
              <Text size={14} />
              Description
            </h3>
            <p className="text-sm text-muted-foreground">{task.description}</p>
          </div>

          <div className="flex flex-col">
            <h3 className="text-sm font-medium flex items-center gap-2">
              <CircleDashed size={14} />
              Status
            </h3>
            <p className="text-sm text-muted-foreground capitalize">
              {task.status}
            </p>
          </div>

          <div className="flex flex-col">
            <h3 className="text-sm font-medium flex items-center gap-2">
              <Calendar size={14} />
              Created At
            </h3>
            <p className="text-sm text-muted-foreground">
              {format(task.createdAt)}
            </p>
          </div>

          {task.updatedAt && (
            <div className="flex flex-col">
              <h3 className="text-sm font-medium flex items-center gap-2">
                <Calendar size={14} />
                Last Updated
              </h3>
              <p className="text-sm text-muted-foreground">
                {format(task.updatedAt)}
              </p>
            </div>
          )}
        </div>

        <div className="col-span-1 flex items-end">
          <Button className="w-full flex gap-2" size="sm" variant="destructive">
            <Trash size={14} />
            Delete
          </Button>
        </div>
      </div>
    </Modal.Content>
  );
}
