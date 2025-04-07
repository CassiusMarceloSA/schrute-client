import axios from "axios";
import { toResult } from "@/utils";
import { NextRequest, NextResponse } from "next/server";
import { buildTelegramURL, messageContent } from "./utils";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";
const TELEGRAM_CHANNEL_ID = process.env.TELEGRAM_CHANNEL_ID || "";

if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHANNEL_ID) {
  throw new Error("Missing environment variables");
}

export async function POST(req: NextRequest) {
  const { title, description, createdAt } = await req.json();

  const url = buildTelegramURL(TELEGRAM_BOT_TOKEN);

  const [error] = await toResult(
    axios.post(url, {
      chat_id: TELEGRAM_CHANNEL_ID,
      text: messageContent(title, description, createdAt),
    })
  );

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }

  return NextResponse.json({ message: "Message sent to Telegram!" });
}
