import "dotenv";
import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL_UNPOOLED is not set in the .env file");
}

export default defineConfig({
  schema: "./src/schema.ts", 
  out: "./drizzle", 
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
