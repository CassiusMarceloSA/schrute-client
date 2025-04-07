import { request } from "@/utils";

type TelegramMessagePayload = {
  title: string;
  description: string;
  createdAt: string;
};

export async function sendMessage(payload: TelegramMessagePayload) {
  const { data } = await request.post("/telegram-message", payload);
  return data;
}
