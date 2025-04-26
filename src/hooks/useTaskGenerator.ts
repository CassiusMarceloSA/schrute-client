import { Task } from "@/models";
import { generateTasksByFile } from "@/services/ai";
import { useMutation } from "@tanstack/react-query";

type TaskGeneratorError = {
  error: string;
};

type Args = {
  onSuccess: (data: Task[]) => void;
};

export const useTaskGenerator = (args?: Partial<Args>) => {
  return useMutation<Task[], TaskGeneratorError, { file: File }>({
    mutationFn: async ({ file }) => {
      const formData = new FormData();
      formData.append("file", file);

      const data = await generateTasksByFile(formData);
      return data;
    },
    onSuccess: args?.onSuccess,
  });
};
