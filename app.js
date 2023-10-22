const express = require("express");
const tasksRouter = require("./routers/tasks");
const connectDB = require("./database/connect");
require("dotenv").config();

const errorHandler = require("./middleware/error-handler");

const app = express();

app.use(express.static("./public"));
app.use(express.json());
app.use("/api/v1/tasks", tasksRouter);
app.use(errorHandler);

const port = process.env.PORT || 8080;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (err) {
    console.log(err);
  }
};

start();
