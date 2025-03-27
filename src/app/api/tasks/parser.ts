import { Task } from "@/models";
import { Models } from 'appwrite'

export function sanitizeTaskList(documentsList: Models.Document[]): Task[] {
  return documentsList.map((item) => ({
    id: item.$id,
    title: item.title,
    description: item.description,
    status: item.status,
    duration: item.duration,
    createdAt: new Date(item.$createdAt),
  }));
}
