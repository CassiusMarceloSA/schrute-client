import { Client, Databases, Storage } from "appwrite";

const APPWRITE_URL = process.env.APPWRITE_URL || "";
const APPWRITE_PROJECT_ID = process.env.APPWRITE_PROJECT_ID || "";
const APPWRITE_API_KEY = process.env.APPWRITE_API_KEY || "";

if (!APPWRITE_URL || !APPWRITE_PROJECT_ID || !APPWRITE_API_KEY) {
  throw new Error("Missing Appwrite environment variables");
}

const client = new Client();

client.setEndpoint(APPWRITE_URL);
client.setProject(APPWRITE_PROJECT_ID);
client.headers["X-Appwrite-Key"] = APPWRITE_API_KEY;

const databases = new Databases(client);
const storages = new Storage(client);

export { client, databases, storages };
