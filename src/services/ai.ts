import { Board } from "@/models";
import { request } from "@/utils";

export async function generateDescriptionSuggestion(
  content: string,
  title: string
) {
  const { data } = await request.post("/ai/description-suggestion", {
    content,
    title,
  });
  return data.content;
}

type BoardAnalysis = {
  status: string;
  distribution: string;
  recommendations: string[];
  statistics: {
    done: number;
    in_progress: number;
    pending: number;
  };
};

export async function generateBoardAnalysis(
  board: Board
): Promise<BoardAnalysis> {
  const { data } = await request.post("/ai/board-analysis", { board });
  return data;
}

export async function generateTasksFile(formData: FormData) {
  const { data } = await request.post("/ai/generate-tasks-file", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}
