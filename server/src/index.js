const express = require("express");
const app = express();

app.use(express.json());

app.get("/ping", (req, res) => {
  res.json({ 
    message: "pong" 
  });
});

app.get("/chat", (req, res) => {
  const question = req.body.question;
  console.log({question});
  res.json({
    answer: "pong",
    question,
  });
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
