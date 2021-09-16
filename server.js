const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Had get request on /");
});
app.post("/", async (req, res) => {
  let currentDate = new Date().toLocaleDateString();

  let newDate = currentDate.split("/").reverse();
  [newDate[1], newDate[2]] = [newDate[2], newDate[1]];
  const date = newDate;

  let obj = req.body;
  let { val } = obj;

  const data = await axios.get(`https://newsapi.org/v2/everything?q=${val}&from=${date}&sortBy=publishedAt&apiKey=2522030560fd4badbf8f3c5df37671f2`);
  const arrayOfArticles = data?.data?.articles;

  res.send(arrayOfArticles);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Listening on 5000");
});
