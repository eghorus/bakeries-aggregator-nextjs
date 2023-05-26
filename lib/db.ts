import { MongoClient } from "mongodb";

export const connectToDB = async () => {
  const connectionStr = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

  const client = await MongoClient.connect(connectionStr);

  return client;
};
