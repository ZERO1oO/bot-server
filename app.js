const express = require("express");
const { startBot } = require("./bot");
const { pairNumber } = require("./pair");

const app = express();
app.use(express.json());

let botRunning = false;

app.post("/start", async (req, res) => {
  if (botRunning) {
    return res.json({ msg: "البوت شغال بالفعل" });
  }

  await startBot();
  botRunning = true;

  res.json({ msg: "تم تشغيل البوت 🔥" });
});

app.post("/pair", async (req, res) => {
  const { number } = req.body;

  if (!number) {
    return res.json({ error: "اكتب رقمك" });
  }

  const code = await pairNumber(number);
  res.json({ code });
});

app.get("/status", (req, res) => {
  res.json({ status: botRunning ? "🟢 ON" : "🔴 OFF" });
});

app.listen(3000, () => console.log("Server Ready 🔥"));