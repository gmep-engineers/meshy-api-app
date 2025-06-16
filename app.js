const express = require("express");
var path = require("path");
const home = require("./pages/home");
const meshy = require("./pages/meshy");
const meshyTasks = require("./pages/meshyTasks");
const getPublicPage = require("./lib/getPublicPage");
const imageRouter = require("./routers/image");
const textRouter = require("./routers/text");

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, "uploads")));
app.set("view engine", "ejs");

app.use("/api/image", imageRouter);
app.use("/api/text", textRouter);

app.get("/meshy", async (req, res) => {
  await getPublicPage(req, res, meshy);
});

app.get("/meshy/tasks", async (req, res) => {
  await getPublicPage(req, res, meshyTasks);
});

app.get("/", async (req, res) => {
  await getPublicPage(req, res, home);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
