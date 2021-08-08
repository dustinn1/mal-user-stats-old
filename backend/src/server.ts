import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import statsRoute from "./routes/stats";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5000",
  "http://localhost:8888",
];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options));
app.use(express.json());

app.use("/api/stats", statsRoute);
app.use("/api/status", (req, res) => res.sendStatus(200));
app.use((req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(404);
});

mongoose.connect(
  process.env.MONGODB_URI as string,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    !err
      ? console.log(`Connection to MongoDB succcessful`)
      : console.log("Connection to MongoDB failed");
  }
);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server started on port ${port}`));
