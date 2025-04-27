import { aiService } from "@/services";
import { useBoardStore } from "@/store";
import { useMutation } from "@tanstack/react-query";
import { Lightbulb } from "lucide-react";
import { useEffect } from "react";
import { Skeleton } from "../ui/skeleton";

const TextSkeleton = () => {
  return <Skeleton className="bg-neutral-900 h-16 w-full" />;
};

const ListSkeleton = () => {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="bg-neutral-900 h-4 w-full" />
      <Skeleton className="bg-neutral-900 h-4 w-full" />
      <Skeleton className="bg-neutral-900 h-4 w-full" />
    </div>
  );
};

export const BoardInsights = () => {
  const { board } = useBoardStore();
  const isValidBoard =
    board.columns.backlog.tasks.length > 0 ||
    board.columns.todo.tasks.length > 0 ||
    board.columns.doing.tasks.length > 0 ||
    board.columns.done.tasks.length > 0;

  const {
    mutate: generateBoardAnalysisMutation,
    isPending: isGenerating,
    data: analysis,
  } = useMutation({
    mutationFn: () => aiService.generateBoardAnalysis(board),
  });

  useEffect(() => {
    if (isValidBoard && !analysis) {
      generateBoardAnalysisMutation();
    }
  }, [isValidBoard, analysis, generateBoardAnalysisMutation]);

  return (
    <div className="bg-neutral-800 h-fit rounded-lg p-4 border border-neutral-700">
      <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
        <Lightbulb size={20} />
        Board Insights
      </h3>
      {analysis || isGenerating ? (
        <div className="flex gap-4 text-sm text-neutral-300">
          <div className="flex flex-col gap-4 w-1/2">
            <div className="flex flex-col gap-1">
              <h4 className="font-bold">Board Status</h4>
              {isGenerating ? (
                <TextSkeleton />
              ) : (
                <p className="text-neutral-400">{analysis.status}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <h4 className="font-bold">Task Distribution</h4>
              {isGenerating ? (
                <TextSkeleton />
              ) : (
                <p className="text-neutral-400">{analysis.distribution}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1 w-1/2">
            <h4 className="font-semibold">Recommendations</h4>
            <ul className="list-disc list-inside space-y-1 text-neutral-400">
              {isGenerating ? (
                <ListSkeleton />
              ) : (
                analysis?.recommendations?.map((rec, index) => (
                  <li className="marker:text-purple-500" key={index}>
                    {rec}
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      ) : (
        <div className="text-neutral-400 w-full text-center">
          {isValidBoard ? (
            <p>No insights available</p>
          ) : (
            <p>
              Add tasks to the board to generate insights.
              <br />
              You can add tasks by clicking the Add button in each column or
              importing a docx file.
            </p>
          )}
        </div>
      )}
    </div>
  );
};
