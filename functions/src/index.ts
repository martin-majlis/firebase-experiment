import * as functions from "firebase-functions";
// import * as fs from "fs";
/*
import { Request, Response, Express } from "express";
import express from "express";

import {
  addEntry,
  getAllEntries,
  updateEntry,
  deleteEntry,
  getEntry,
//  authenticate,
} from "./entryController";
*/

// import { getStorage, ref, uploadBytes } from "firebase/storage";
import { storage } from "./config/firebase";

// Create a root reference
// const storage = getStorage();

/*
const app: Express = express();

app.get("/", (req: Request, res: Response) =>
  res.status(200).send("Hey there!")
);
app.post("/entries", addEntry);
app.get("/entries", getAllEntries);
app.get("/entries/:entryId", getEntry);
app.patch("/entries/:entryId", updateEntry);
app.delete("/entries/:entryId", deleteEntry);

exports.app = functions.https.onRequest(app);
*/
// Listen for changes in all documents in the 'users' collection

exports.takeScreenshot = functions.firestore
  .document("entries/{entryId}")
  .onWrite((change, context) => {
    // If we set `/users/marie` to {name: "Marie"} then
    // context.params.userId == "marie"
    // ... and ...
    // change.after.data() == {name: "Marie"}

    const puppeteer = require("puppeteer");

    (async () => {
      const entryId = context.params.entryId;
      const imagePath = `entry-${entryId}.png`;
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      const baseUrl = "https://fir-experiment-e213a.web.app/entry/";
      // const baseUrl = 'http://localhost:3000/entry/'
      await page.goto(baseUrl + entryId);
      await page.screenshot({ path: imagePath });
      // https://googleapis.dev/nodejs/storage/latest/Bucket.html#upload
      storage.bucket().upload(imagePath, { public: true });

      // fs.unlink(imagePath, (err) => {});
      await browser.close();
    })();
  });

// Listen for changes in all documents in the 'users' collection
exports.userAdded = functions.firestore
  .document("users/{userId}")
  .onWrite((change, context) => {
    console.log(context.params.userId);
  });
