import { StreamChat } from "stream-chat";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.STEAM_API_KEY;
const apiSecret = process.env.STEAM_API_SECRET_KEY;

if (!apiKey || !apiSecret) {
  console.error(
    "Missing Stream API key or secret. Please set them in the environment variables.",
  );
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {
  try {
    await streamClient.upsertUsers([userData]);
    return userData;
  } catch (err) {
    console.error("Error upserting user to Stream in stream.js:", err);
  }
};
