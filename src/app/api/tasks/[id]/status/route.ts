import { databases } from "@/lib/appwrite";
import { createTelegramRequest, telegramUtils, toResult } from "@/utils";
import { NextResponse } from "next/server";
import { validateUpdateStatus } from "../../validators";

const databaseId = process.env.APPWRITE_DATABASE_ID || "";
const collectionId = process.env.APPWRITE_COLLECTION_ID || "";
const TELEGRAM_CHANNEL_ID = process.env.TELEGRAM_CHANNEL_ID || "";
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";

if (
  !databaseId ||
  !collectionId ||
  !TELEGRAM_CHANNEL_ID ||
  !TELEGRAM_BOT_TOKEN
) {
  throw new Error("Missing environment variables");
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { status } = await req.json();

  const validate = validateUpdateStatus({ status });

  if (!validate.success) {
    return NextResponse.json(validate.error.format(), { status: 400 });
  }

  const [updateError, updatedTask] = await toResult(
    databases.updateDocument(databaseId, collectionId, id, {
      status,
    })
  );

  if (updateError) {
    return NextResponse.json(updateError, { status: 500 });
  }

  const { TELEGRAM_ACTIONS, messageContent } = telegramUtils;
  const telegramRequest = createTelegramRequest(TELEGRAM_BOT_TOKEN);
  const [telegramError] = await toResult(
    telegramRequest.post(TELEGRAM_ACTIONS.SEND_MESSAGE, {
      chat_id: TELEGRAM_CHANNEL_ID,
      text: messageContent({
        title: updatedTask.title,
        description: updatedTask.description,
        date: updatedTask.$updatedAt,
        isNewTask: false,
      }),
    })
  );

  if (telegramError) {
    console.error("Failed to send Telegram notification:", telegramError);
  }

  return NextResponse.json(updatedTask);
}
