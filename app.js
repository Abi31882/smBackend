const express = require("express");
const morgan = require("morgan");
const userRouter = require("./routes/userRoutes");
const discussionRouter = require("./routes/discussionRoutes");
const replyRouter = require("./routes/replyRoutes");
const app = express();
const cors = require("cors");
const globalErrorHandler = require("./controllers/errorController");

const corsOptions = {
  origin: "https://vibrant-ardinghelli-cbae73.netlify.app",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());
// development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log("development");
}

// production logging
if (process.env.NODE_ENV === "production") {
  console.log("production");
}

app.use("/user", userRouter);
app.use("/discussion", discussionRouter);
app.use("/reply", replyRouter);

app.all("*", (req, res, next) => {
  next();
  return res.json(`can't find ${req.originalUrl} on this server`);
});

app.use(globalErrorHandler);

// 2) Routes
module.exports = app;
