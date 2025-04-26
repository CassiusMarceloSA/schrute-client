import { generateTasksByFile } from "@/services/ai";
import { useMutation } from "@tanstack/react-query";

type TaskGeneratorResponse = {
  response: string;
};

type TaskGeneratorError = {
  error: string;
};

export const useTaskGenerator = () => {
  return useMutation<TaskGeneratorResponse, TaskGeneratorError, { file: File }>(
    {
      mutationFn: async ({ file }) => {
        const formData = new FormData();
        formData.append("file", file);

        const { data } = await generateTasksByFile(formData);

        return data;
      },
    }
  );
};
