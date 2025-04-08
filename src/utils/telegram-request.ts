import axios from "axios";
import { formatDate } from ".";

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

const createTelegramRequest = (botToken: string) =>
  axios.create({
    baseURL: buildTelegramURL(botToken),
  });

export const TELEGRAM_ACTIONS = {
  SEND_MESSAGE: "sendMessage",
};

export default createTelegramRequest;
