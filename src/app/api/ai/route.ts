import { openai } from "@/lib/openai";
import { toResult } from "@/utils";

const roleDescription = `
As a kanban board manager, you will help me to enhance the tasks description. 
So based on the text below I need that you enhance the content based on the task title and the provided description.
`;

const generatePromptContent = (content: string, title: string) => {
  return `
  I need to improve text below based on the task title and the provided description. 
  The response must have maximum 300 characters and be in portuguese. 
  The response must have following a JSON format with only one property named content with the enhanced description.
  Task title: ${title}
  Task description: ${content}
  `;
};

export async function POST(req: Request) {
  const [, body] = await toResult(req.json());
  const { content, title } = body;

  if (!content || !title) {
    return new Response("No content or title in the request", { status: 400 });
  }

  const [promptError, response] = await toResult(
    openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: roleDescription },
        { role: "user", content: generatePromptContent(content, title) },
      ],
    })
  );
  
  if (promptError) {
    return new Response(promptError.message, { status: 500 });
  }

  return new Response(response.choices[0].message.content);
}
