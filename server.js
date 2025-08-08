const express = require("express");
const bodyParser = require("body-parser");
const redis = require("redis");
const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

const redisClient = redis.createClient();
redisClient.on("error", (err) => console.log("Redis Client Error", err));
redisClient.connect();

app.post("/send-message", async (req, res) => {
  const { sender, message } = req.body;
  const id = Date.now();
  await redisClient.set(id.toString(), JSON.stringify({ sender, message }));
  res.json({ id });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
