const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const messages = [];
//To GET all messages
app.get("/messages", (req, res) => {
  res.json(messages);
});

//To POST a new message
app.post("/messages", (req, res) => {
  const newMessage = req.body;

  messages.push(newMessage);

  res.status(201).json({
    success: true,
    message: "Message added",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});