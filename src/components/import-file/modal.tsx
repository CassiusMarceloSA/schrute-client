import { Upload } from "lucide-react";
import { useState } from "react";
import { Modal } from "../shared/modal/modal";
import { Button } from "../ui/button";
import Stepper from "./stepper";
import FileInput from "./file-input";
import { useTaskGenerator } from "@/hooks/useTaskGenerator";
import { Task } from "@/models";
import { Checkbox } from "../ui/checkbox";
import { useMutation } from "@tanstack/react-query";
import { taskService } from "@/services";
import { useFetchTasks } from "@/hooks";
const ImportFileModal = () => {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);
  const { refetch } = useFetchTasks({
    enabled: false,
  });
  const { mutate: generateTasks, isPending } = useTaskGenerator({
    onSuccess: (data: Task[]) => {
      const tasks = data.map((item, index) => ({
        ...item,
        status: "backlog",
        duration: 30,
        id: index.toString(),
      })) as Task[];
      setTasks(tasks);
      setSelectedTasks(tasks);
      setFile(null);
      setCurrentStep(1);
    },
  });

  const handleSelectTask = (checked: boolean, task: Task) => {
    if (checked) {
      setSelectedTasks((prev) => [...prev, task]);
      return;
    }
    setSelectedTasks((prev) => prev.filter((t) => t.id !== task.id));
  };

  const steps = [
    {
      label: "Select file to import",
    },
    {
      label: "Select tasks to add",
    },
  ];

  const { mutate: createMultipleTasks, isPending: isCreating } = useMutation({
    mutationFn: (tasks: Task[]) => taskService.createMultipleTasks(tasks),
    onSuccess: async () => {
      setOpen(false);
      setFile(null);
      setTasks([]);
      setSelectedTasks([]);
      setCurrentStep(0);
      await refetch();
    },
  });

  return (
    <Modal
      className="min-h-[500px] grid-rows-6"
      open={open}
      updateOpen={setOpen}
      title="Import tasks"
      description="Import tasks by file to the board."
      buttonContent={
        <Button variant="secondary">
          <Upload />
          Import tasks
        </Button>
      }
    >
      <div className="grid grid-cols-2 gap-2 row-span-5 h-full">
        <Stepper
          steps={steps}
          currentStep={currentStep}
          onStepChange={setCurrentStep}
        />
        {currentStep === 0 && (
          <FileInput
            file={file}
            handleFile={setFile}
            handleImport={(selectedFile) =>
              generateTasks({ file: selectedFile })
            }
            isImporting={isPending}
          />
        )}
        {currentStep === 1 && (
          <>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-neutral-500">Tasks</p>
              <ul className="flex flex-col gap-4 overflow-y-auto max-h-[350px] scrollbar-hide">
                {tasks.map((task) => (
                  <li key={task.id} className="flex items-center gap-2">
                    <Checkbox
                      id={task.id}
                      className="data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500 border-neutral-700"
                      checked={selectedTasks.includes(task)}
                      onCheckedChange={(checked) => {
                        handleSelectTask(!!checked, task);
                      }}
                    />
                    <label htmlFor={task.id}>{task.title}</label>
                  </li>
                ))}
              </ul>

              <p className="text-xs text-end text-neutral-500">
                You have selected {selectedTasks.length} tasks of {tasks.length}
              </p>
            </div>
            <Button
              variant="secondary"
              disabled={selectedTasks.length === 0 || isCreating}
              className="col-span-2 mt-4"
              onClick={() => createMultipleTasks(selectedTasks)}
            >
              {isCreating ? "Adding tasks..." : "Confirm tasks"}
            </Button>
          </>
        )}
      </div>
    </Modal>
  );
};

export default ImportFileModal;
