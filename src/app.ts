import express, { Application, Request, Response } from "express";
import { DB, PORT } from "./config";
import { errorHandler } from "./middleware/errorHandler";
import createHttpError from "http-errors"
import mongoose from "mongoose";
import routes from "./routes"
const app: Application = express();

app.use(express.json());

app.use("/", routes)

app.use(() => {
  throw createHttpError(404, "Route not found");
})

app.use(errorHandler);

mongoose
  .connect(DB)
  .then(() => {
    console.log("Connected to db");
    app.listen(PORT, () => {
      console.log(`Listening On PORT ${PORT}`);
    });
  })
  .catch(() => {
    throw createHttpError(501, "Unable to connect database");
  });

export default app;