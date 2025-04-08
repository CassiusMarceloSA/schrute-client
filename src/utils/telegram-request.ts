import axios from "axios";
import { formatDate } from ".";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";

if (!TELEGRAM_BOT_TOKEN) {
  throw new Error("Missing environment variables");
}

export const buildTelegramURL = (token: string) => {
  return `https://api.telegram.org/bot${token}/`;
};

type MessageContent = {
  title: string;
  description: string;
  date: string;
  isNewTask?: boolean;
};
export const messageContent = ({
  title,
  description,
  date,
  isNewTask = true,
}: MessageContent) => {
  return `
  ${isNewTask ? "Nova tarefa criada:" : "Tarefa atualizada:"}
  
  ${isNewTask ? "Criado em:" : "Atualizado em:"} ${formatDate(date)}
  Titulo: ${title}
  Descrição: ${description}
      `.trim();
};

const telegramRequest = axios.create({
  baseURL: buildTelegramURL(TELEGRAM_BOT_TOKEN),
});

export const TELEGRAM_ACTIONS = {
  SEND_MESSAGE: "sendMessage",
};

export default telegramRequest;
