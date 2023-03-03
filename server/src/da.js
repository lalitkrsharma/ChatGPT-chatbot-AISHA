const { response } = require("express");
const express = require("express");
const OPENAI_API_KEY = "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"
const { Configuration, OpenAIApi } = require ("openai");
const configuration = new Configuration({apiKey: OPENAI_API_KEY});
const cors = require("cors");
const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get("/ping", (req, res) => {
  res.json({ 
    message: "pong" 
  });
});

app.get("/chat", (req, res) => {
  const question = req.body.question;

openai
.createChatCompletion({
  model: "gpt-3.5-turbo",
  frequency_penalty: 0.5,
  // max_tokens: 100,
  user: "Admission Seeker or Students of Arka Jain University",
  messages: [
    {role: "user", content: "Answer as if your are a chatbot named 'AISHA' that stands for 'Artificially Intelligent Super Helpful Assistant' and is designed to assist student and admission seeker of Arka Jain University by a group of students who named themselves AI Forge. The website for the university is 'arkajainuniversity.ac.in'"},{role: "user", content: question}
],
}).then(response => {
  return(response.data.choices[0].message);
})
// .then((answer) => {
//   const array = answer?.split("\n").filter((value) => value).map(value => value.trim());
// })
.then(answer => {
  res.json({
    answer: answer,
    prompt : question,
  });
});


  console.log({question});
  
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
