import dotenv from "dotenv";

dotenv.config();
console.log("process.env.NODE_ENV ---> ", process.env.NODE_ENV);

export const DB = process.env.NODE_ENV === "test" ? process.env.TEST_DB_MONGO_DB_URL! : process.env.MONGO_DB_URL!;
export const PORT = parseInt(process.env.PORT!);
export const BASE_URL = "https://hacker-news.firebaseio.com/v0";
