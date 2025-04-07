import { Task } from "@/models";
import { taskService } from "@/services";
import { useQuery } from "@tanstack/react-query";

const fetchTasks = async (query?: string) => {
  const { tasks } = await taskService.getTasks(query);
  return tasks;
};

const fetchTaskQuery = (query?: string, queryKey = "tasks") => ({
  queryKey: [queryKey, query],
  queryFn: () => fetchTasks(query),
  refetchOnWindowFocus: false,
});

type Args = {
  query: string;
  queryKey: string;
  select: (data: Task[]) => void;
  enabled: boolean;
};
export default function useFetchTasks(args?: Partial<Args>) {
  return useQuery({
    ...fetchTaskQuery(args?.query, args?.queryKey),
    select: args?.select,
    enabled: args?.enabled ?? true
  });
}
