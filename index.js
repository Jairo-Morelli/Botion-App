import express from 'express'

// port app will be running on. move to .env file later and use dotenv
const PORT = 8888;

// invoke express and put it in variable 'app'
const app = express();

function addTimestamp(req, res, next) {
  req.custom = {
    requestedAt: new Date().toISOString()
  }
  console.log("ADD TIMESTAMP")
  next()
}


app.use(express.static('public'));

app.use(addTimestamp)



const questions = [
  {
    question: "What is the capital of France?",
    options: ["Madrid", "Berlin", "Paris", "Rome"],
    answerIndex: 2
  },
  {
    question: "What gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    answerIndex: 1
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"],
    answerIndex: 1
  },
  {
    question: "What is the boiling point of water at sea level?",
    options: ["90°C", "100°C", "80°C", "120°C"],
    answerIndex: 1
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answerIndex: 1
  },
  {
    question: "What is the hardest natural substance on Earth?",
    options: ["Gold", "Iron", "Diamond", "Quartz"],
    answerIndex: 2
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    answerIndex: 1
  },
  {
    question: "Which is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    answerIndex: 3
  },
  {
    question: "What is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    answerIndex: 2
  },
  {
    question: "Which country invented paper?",
    options: ["Egypt", "China", "Greece", "India"],
    answerIndex: 1
  },
  {
    question: "What is the currency of Japan?",
    options: ["Won", "Yuan", "Yen", "Dollar"],
    answerIndex: 2
  },
  {
    question: "Which blood type is known as the universal donor?",
    options: ["A", "B", "AB", "O negative"],
    answerIndex: 3
  },
  {
    question: "In which year did the Titanic sink?",
    options: ["1905", "1912", "1920", "1898"],
    answerIndex: 1
  },
  {
    question: "What is H2O more commonly known as?",
    options: ["Salt", "Hydrogen", "Water", "Oxygen"],
    answerIndex: 2
  },
  {
    question: "Which organ pumps blood through the body?",
    options: ["Lungs", "Heart", "Liver", "Kidneys"],
    answerIndex: 1
  },
  {
    question: "What is the square root of 64?",
    options: ["6", "7", "8", "9"],
    answerIndex: 2
  },
  {
    question: "Which animal is known as the King of the Jungle?",
    options: ["Tiger", "Lion", "Elephant", "Leopard"],
    answerIndex: 1
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    options: ["Gold", "Osmium", "Oxygen", "Zinc"],
    answerIndex: 2
  },
  {
    question: "How many continents are there?",
    options: ["5", "6", "7", "8"],
    answerIndex: 2
  },
  {
    question: "What is the largest animal?",
    options: ["Whale", "Ant", "Lion", "Gorilla"],
    answerIndex: 0
  }
]

function verifyToken(req, res, next) {
  const authorization = req.headers["authorization"]
  if(authorization !== "Jairo") {
    res.status(401).send("INVALID")
  } else next()
}


app.get("/protected", verifyToken, function(req, res) {
  res.send({
    msg: "HAD TOKEN",
    requestedAt: req.custom.requestedAt
  })
})



// simple get request -> will be on <host>/ping
app.get("/ping", function(req, res, next) {
  req.custom = new Date().toISOString() 
  next()
},function(req, res) {
  console.log('req =', req.custom)
  res.send("pong" + " " + req.custom)
})

app.get("/teacher-ask", function(req, res) {
  const randomIdx = Math.floor(Math.random() * questions.length) + 1

  res.send({
    ...questions[randomIdx],
    requestedAt: req.custom.requestedAt
  })
})

// keep app persist
app.listen(PORT, function() {
  console.log("Server running on port:", PORT)
})

// did you close the zoom?
