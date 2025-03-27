import { databases } from "@/lib/appwrite";
import { NextRequest, NextResponse } from "next/server";

const databaseId = process.env.APPWRITE_DATABASE_ID || "";
const collectionId = process.env.APPWRITE_COLLECTION_ID || "";

export async function GET() {
  const tasks = await databases.listDocuments(
    databaseId,
    collectionId
  );

  return NextResponse.json(tasks);
}
