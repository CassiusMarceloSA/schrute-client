import { databases } from "@/lib/appwrite";
import { NextRequest, NextResponse } from "next/server";
import { toResult } from "@/utils";

const databaseId = process.env.APPWRITE_DATABASE_ID || "";
const collectionId = process.env.APPWRITE_COLLECTION_ID || "";

if (!databaseId || !collectionId) {
  throw new Error("Missing environment variables");
}

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(req: NextRequest, { params }: Params) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
  }

  const [taskError, task] = await toResult(
    databases.getDocument(databaseId, collectionId, id)
  );

  if (taskError) {
    return NextResponse.json(taskError, { status: 500 });
  }

  return NextResponse.json(task);
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
  }

  const [deleteError] = await toResult(
    databases.deleteDocument(databaseId, collectionId, id)
  );

  if (deleteError) {
    return NextResponse.json(deleteError, { status: 500 });
  }

  return NextResponse.json({ message: "Task deleted successfully" });
}
