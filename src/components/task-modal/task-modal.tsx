import { useFetchTasks } from "@/hooks";
import { ColumnEnum, Task } from "@/models";
import { taskService } from "@/services";
import { useBoardStore } from "@/store";
import { TW_BOARD_COLORS } from "@/utils";
import format from "@/utils/date-formatter";
import { useMutation } from "@tanstack/react-query";
import { Calendar, CircleDashed, Text, Trash } from "lucide-react";
import { useState } from "react";
import { Button, Modal } from "../shared";

type Props = {
  task: Task | null;
  open: boolean;
  onClose: () => void;
};
const BOARD_ORDER = ["backlog", "todo", "doing", "done"] satisfies ColumnEnum[];

export function TaskModal({ task, open, onClose }: Props) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { setBoard } = useBoardStore();

  const { refetch } = useFetchTasks({
    select: setBoard,
    enabled: false,
  });

  const { mutate: deleteTaskMutation, isPending } = useMutation({
    mutationFn: () => taskService.deleteTask(task?.id || ""),
    onSuccess: () => {
      refetch();
      setIsDeleting(false);
      onClose();
    },
  });

  if (!task) return null;
  const color = TW_BOARD_COLORS[BOARD_ORDER.indexOf(task.status)].replace(
    "500",
    "700"
  );

  return (
    <Modal.Content
      open={open}
      updateOpen={onClose}
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
          <Button
            className="w-full flex gap-2 border-destructive text-destructive bg-transparent hover:bg-destructive"
            onClick={() => setIsDeleting(true)}
            size="sm"
            variant="outline"
          >
            <Trash size={14} />
            Delete
          </Button>
        </div>
        {isDeleting && (
          <Modal.Content
            open={isDeleting}
            updateOpen={() => setIsDeleting(false)}
            title="Delete Task"
            description="Are you sure you want to delete this task?"
          >
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <Button variant="ghost" onClick={() => setIsDeleting(false)}>
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => deleteTaskMutation()}
                  disabled={isPending}
                >
                  Confirm
                </Button>
              </div>
            </div>
          </Modal.Content>
        )}
      </div>
    </Modal.Content>
  );
}
