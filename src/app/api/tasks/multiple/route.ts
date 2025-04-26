import { NextResponse } from "next/server";

import { databases } from "@/lib/appwrite";
import { toResult } from "@/utils";
import { NextRequest } from "next/server";
import { validateCreateTask } from "../validators";

const databaseId = process.env.APPWRITE_DATABASE_ID || "";
const collectionId = process.env.APPWRITE_COLLECTION_ID || "";

export async function POST(req: NextRequest) {
  const [, body] = await toResult(req.json());

  for (const task of body) {
    const validation = validateCreateTask(task);
    if (!validation.success) {
      return NextResponse.json(validation.error.issues, { status: 400 });
    }
  }

  const documents = body.map((task: any) => ({
    documentId: "unique()",
    data: {
      title: task.title,
      description: task.description,
      status: task.status,
      duration: task.duration,
    },
  }));

  const [creationError, document] = await toResult(
    Promise.all(
      documents.map((document: any) =>
        databases.createDocument(
          databaseId,
          collectionId,
          document.documentId,
          document.data
        )
      )
    )
  );

  if (creationError) {
    return NextResponse.json(creationError, { status: 500 });
  }

  return NextResponse.json(document);
}
