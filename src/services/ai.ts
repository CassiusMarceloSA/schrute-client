import { request } from "@/utils";

export async function getAiResponse(content: string, title: string) {
  const { data } = await request.post("/tasks/description-suggestion", { content, title });
  return data.content;
}