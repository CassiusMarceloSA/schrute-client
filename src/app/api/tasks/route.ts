import { databases } from "@/lib/appwrite";
import { NextRequest, NextResponse } from "next/server";
import { validateCreateTask } from "./validators";
import { sanitizeTaskList } from "./parser";
import { toResult } from "@/utils";

const databaseId = process.env.APPWRITE_DATABASE_ID || "";
const collectionId = process.env.APPWRITE_COLLECTION_ID || "";

if (!databaseId || !collectionId) {
  throw new Error("Missing environment variables");
}

export async function GET() {
  const [taskError, tasks] = await toResult(
    databases.listDocuments(databaseId, collectionId)
  );
  if (taskError) {
    return NextResponse.json(taskError, { status: 500 });
  }

  const parsedTasks = sanitizeTaskList(tasks.documents);
  return NextResponse.json({ total: tasks.total, tasks: parsedTasks });
}

export async function POST(req: NextRequest) {
  const [, body] = await toResult(req.json());
  const validation = validateCreateTask(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.issues, { status: 400 });
  }

  const { title, description, status, duration } = body;
  const [creationError, document] = await toResult(
    databases.createDocument(databaseId, collectionId, "unique()", {
      title,
      description,
      status,
      duration,
    })
  );

  if (creationError) {
    return NextResponse.json(creationError, { status: 500 });
  }

  return NextResponse.json(document);
}
