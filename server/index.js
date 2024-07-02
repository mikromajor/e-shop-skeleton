//do not forget enter cd ./server
//видео 50:38
require("dotenv").config();
const models = require("./models/models");
const ApiError = require("./error/ApiError");
const express = require("express");
const fileUpLoad = require("express-fileupload");
const db = require("./db");
const cors = require("cors");
const router = require("./routes/index");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");
const path = require("path");

const PORT = process.env.PORT || 7000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpLoad({}));
app.use("/api", router);
app.use(errorHandler); // має додаватися останнім

app.get("/", (req, res) => {
  res.status(200).json({ message: "working ! ! ! " });
});

const start = async () => {
  try {
    await db.authenticate();
    await db.sync();

    app.listen(PORT, () =>
      console.log(`server started on port ${PORT}`)
    );
  } catch (e) {
    console.log("UPS!!!", e);
  }
};
start();
