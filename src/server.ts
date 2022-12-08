import dotenv from "dotenv";
import express from 'express';
import path from "path";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.use('/js', express.static(path.join(__dirname, "..", 'assets', "js")))
app.use('/css', express.static(path.join(__dirname, "..", 'assets', "css")))


app.get("/", (req, res) => {

  const data = { metaTitle: "URL Shortener", title: "Paste the URL to Shorten" }
  res.render(path.join(__dirname, "..", 'views', "index.ejs"), data)
})

app.listen(port, () => {
  console.log(`server running at port ${port}`)
})  