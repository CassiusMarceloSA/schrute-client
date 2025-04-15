import { openai } from "@/lib/openai";
import { generateHash, toResult } from "@/utils";
import { Board, Column } from "@/models";

/* eslint-disable @typescript-eslint/no-explicit-any */
const dailySuggestion = new Map<string, any>();

const generateMapId = (value: string) => {
  return generateHash(value);
};

const buildIdentifier = (columns: Column[]) => {
  let stringIdentifier = "";

  for (const key in columns) {
    stringIdentifier += `-${columns[key].id}-${columns[key].tasks.length}`;
  }

  const today = new Date().toLocaleDateString();

  return stringIdentifier + today;
};

const roleDescription = `
Como um analista especializado em gestão de tarefas Kanban, você deve analisar o estado atual do quadro e fornecer insights valiosos.
Sua análise deve ser clara, concisa e focada em ajudar a melhorar a produtividade e organização do trabalho.
`;

const generatePromptContent = (board: Board) => {
  const backlogTasks = board.columns.backlog.tasks.length;
  const todoTasks = board.columns.todo.tasks.length;
  const doingTasks = board.columns.doing.tasks.length;
  const doneTasks = board.columns.done.tasks.length;
  const totalTasks = backlogTasks + todoTasks + doingTasks + doneTasks;
  const completionRate = totalTasks > 0 ? (doneTasks / totalTasks) * 100 : 0;

  return `
  Analise o estado atual do quadro Kanban e forneça insights e recomendações.
  O quadro possui as seguintes métricas:
  - Total de tarefas: ${totalTasks}
  - Taxa de conclusão: ${completionRate.toFixed(1)}%
  - Distribuição:
    * Backlog: ${backlogTasks} tarefas
    * To Do: ${todoTasks} tarefas
    * In Progress: ${doingTasks} tarefas
    * Done: ${doneTasks} tarefas

  Forneça uma análise em português com:
  1. Status atual do quadro
  2. Distribuição de tarefas
  3. Recomendações específicas baseadas nos dados
  4. Percentual com estado das tarefas

  A resposta deve ser um JSON com as seguintes propriedades:
  "status": string com o status geral do quadro,
  "distribution": string com análise da distribuição,
  "recommendations": array de strings com recomendações específicas

  Garanta que a resposta seja um JSON válido e não um JSON string.
  `;
};

export async function POST(req: Request) {
  const [, body] = await toResult(req.json());
  const { board } = body;

  if (!board) {
    return new Response("No board data in the request", { status: 400 });
  }

  const stringIdentifier = buildIdentifier(board.columns);
  const mapIdentifier = generateMapId(stringIdentifier);

  if (dailySuggestion.has(mapIdentifier)) {
    return new Response(dailySuggestion.get(mapIdentifier));
  }

  const [promptError, response] = await toResult(
    openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: roleDescription },
        { role: "user", content: generatePromptContent(board) },
      ],
    })
  );

  if (promptError) {
    return new Response(promptError.message, { status: 500 });
  }

  dailySuggestion.set(mapIdentifier, response.choices[0].message.content);
  return new Response(response.choices[0].message.content);
}
