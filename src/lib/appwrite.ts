import { Client, Databases, Storage} from "appwrite";

const APPWRITE_URL = "http://localhost/v1";
const APPWRITE_PROJECT_ID = "xxxxxxxxxxxxxxxxx";

const client = new Client();

client.setEndpoint(APPWRITE_URL);
client.setProject(APPWRITE_PROJECT_ID);

const databases = new Databases(client);
const storages = new Storage(client);

export { client, databases, storages };
