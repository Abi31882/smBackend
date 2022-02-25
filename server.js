const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! SHUTTING DOWN");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connection successfull");
  });

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`app running on port ${port}...`);
  // console.log(DB);
});

process.on("unhandledRejection", (err) => {
  console.log("UNGANDLED REJECTION! SHUTTING DOWN");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
