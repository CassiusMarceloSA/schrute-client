import { databases } from "@/lib/appwrite";
import { NextResponse } from "next/server";
import { validateUpdateStatus } from "../../validators";
import { toResult } from "@/utils";

const databaseId = process.env.APPWRITE_DATABASE_ID || "";
const collectionId = process.env.APPWRITE_COLLECTION_ID || "";

if (!databaseId || !collectionId) {
  throw new Error("Missing environment variables");
}


export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { status } = await req.json();

    const validate = validateUpdateStatus({ status });

    if (!validate.success) {
      return NextResponse.json(validate.error.format(), { status: 400 });
    }

    const [updateError, updatedTask] = await toResult(
      databases.updateDocument(
        databaseId,
        collectionId,
        id,
        {
          status,
        }
      )
    );

    if (updateError) {
      return NextResponse.json(updateError, { status: 500 });
    }

    return NextResponse.json(updatedTask);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update task status" },
      { status: 500 }
    );
  }
}
