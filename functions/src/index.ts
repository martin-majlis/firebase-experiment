import * as functions from "firebase-functions";
import express, { Request, Response, Express } from "express";
import {
  addEntry,
  getAllEntries,
  updateEntry,
  deleteEntry,
} from "./entryController";

const app: Express = express();

app.get("/", (req: Request, res: Response) =>
  res.status(200).send("Hey there!")
);
app.post("/entries", addEntry);
app.get("/entries", getAllEntries);
app.patch("/entries/:entryId", updateEntry);
app.delete("/entries/:entryId", deleteEntry);

exports.app = functions.https.onRequest(app);
