import { NextResponse } from "next/server";
import OpenAI from "openai";
import { extractTextFromDocx } from "@/lib/mammoth";
import { toResult } from "@/utils";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "File is required" }, { status: 400 });
  }

  let text = "";
  const buffer = await file.arrayBuffer();

  if (
    file.type ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    text = await extractTextFromDocx(buffer);
  } else {
    return NextResponse.json(
      { error: "Unsupported file type. Only DOCX are supported" },
      { status: 400 }
    );
  }

  const [error, response] = await toResult(
    openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that analyzes documents and provides insights based on the content.",
        },
        {
          role: "user",
          content: `
          Here is the content of the document (${file.name}):
          \n\n${text}.\n 
          The response should be in JSON format. 
          The JSON should be a list of tasks. Each task should have the following fields: title, description, tags, priority, phase. 
          `,
        },
      ],
      response_format: { type: "json_object" },
    })
  );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const json = JSON.parse(response.choices[0].message.content || "");
  return NextResponse.json({ tasks: json.tasks });
}
