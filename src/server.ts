import path from "path";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./lib/connectDB";
import translate from "./translate.json";
import AppRoutes from "./routes/index.route";

type Lang = keyof typeof translate;

connectDB();
dotenv.config({ path: process.cwd() + '/.env.local', override: true });

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.use("/js", express.static(path.join(__dirname, "..", "assets", "js")));
app.use("/css", express.static(path.join(__dirname, "..", "assets", "css")));

app.set("trust proxy", true);

AppRoutes(app);

app.get("/", (req, res) => {
  const lang = req.headers["accept-language"]?.split(";")[0].split("-")[0] as Lang;

  const data = lang ? translate[lang] : translate["en"];

  res.render(path.join(__dirname, "..", "views", "index.ejs"), data);
});

app.listen(port, () => {
  console.log(`server running at port ${port}`);
});
