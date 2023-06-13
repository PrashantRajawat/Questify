import { Client, Account, Storage ,Databases } from "appwrite";

const client = new Client();
const databases = new Databases(client);
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6480ba2d7703a4d4b17e");
const account = new Account(client);
const storage = new Storage(client);


export { client,account, storage,databases };
