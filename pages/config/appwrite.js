import react from "react"
import { Client, Account, Storage } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6480ba2d7703a4d4b17e");
const account = new Account(client);
const storage = new Storage(client);

export default client;
export { account, storage };
