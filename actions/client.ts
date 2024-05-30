import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

const getClient = () => {
  if (!apiKey) throw new Error("Missing Stream API key");
  if (!apiSecret) throw new Error("Missing Stream API secret");

  const client = new StreamClient(apiKey, apiSecret);

  return client;
};

export const client = getClient();
