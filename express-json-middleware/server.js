const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

function usernameMiddleware(req, res, next) {
  req.username = req.get("X-Username") || null;
  next();
}

function bodyValidationMiddleware(req, res, next) {
  if (!Array.isArray(req.body)) {
    return res.status(400).send("Body must be an array");
  }

  const allStrings = req.body.every(
    (item) => typeof item === "string"
  );

  if (!allStrings) {
    return res.status(400).send("All items must be strings");
  }

  next();
}

app.use(usernameMiddleware);
app.use(bodyValidationMiddleware);

app.post("/", (req, res) => {
  const usernameMessage = req.username
    ? `You are authenticated as ${req.username}.`
    : "You are not authenticated.";

  const subjectsCount = req.body.length;
  const subjectWord = subjectsCount === 1 ? "subject" : "subjects";
  const subjectsList = req.body.join(", ");

  res.send(`
${usernameMessage}

You have requested information about ${subjectsCount} ${subjectWord}: ${subjectsList}.
`);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});