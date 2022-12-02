// require('dotenv').config();
import request from "request";
import upload from "./upload.mjs";
import express from "express";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 8080;
// app.use(express.urlencoded({extended: true}))
// app.use(express.json())

app.get("/", (req, res) => {
  res.send("Welcome to CORS server");
});
app.post("/upload", (req, res) => {
  res.header({
    "Access-Control-Allow-Origin": "*",
  });
  upload(
    () => {
      console.log("Success");
      res.send({});
    },
    "Data:Sandbox/JosephineBot/uploadTest.tab",
    "test"
  );
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
