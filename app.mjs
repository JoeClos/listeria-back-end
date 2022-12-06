// require('dotenv').config();
// import request from "request";
import upload from "./upload.mjs";
import express from "express";
import * as dotenv from "dotenv";
import cors from 'cors';
dotenv.config();

const app = express();
const port = parseInt(process.env.PORT, 10) || 8000;
// app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
  res.send("Welcome to CORS server");
});

app.post("/upload", (req, res) => {
  res.header({
    "Access-Control-Allow-Origin": "*",
  });
  console.log(req.body)
  upload(
    () => {
      console.log("Success");
      res.send({});
    },
    req.body.pageName,
    req.body.content
  );
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
