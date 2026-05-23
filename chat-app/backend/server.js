const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const messages = [];

app.get("/messages", (req, res) => {
  res.json(messages);
});

app.post("/messages", (req, res) => {
  const newMessage = {
    id: Date.now(),
    username: req.body.username,
    text: req.body.text,
    likes: 0,
    dislikes: 0,
  };

  messages.push(newMessage);
  res.status(201).json(newMessage);
});

app.post("/messages/:id/like", (req, res) => {
  const message = messages.find((msg) => msg.id === Number(req.params.id));
  message.likes += 1;
  res.json(message);
});

app.post("/messages/:id/dislike", (req, res) => {
  const message = messages.find((msg) => msg.id === Number(req.params.id));
  message.dislikes += 1;
  res.json(message);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});