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

// export
