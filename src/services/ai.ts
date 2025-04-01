import { request } from "@/utils";

export async function getAiResponse(content = "Substituir", title = "Substituir biblioteca de componentes") {
  const { data } = await request.post("/ai", { content, title });
  return data.content;
}