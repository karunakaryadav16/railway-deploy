const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const process = require("dotenv");
const cors = require('cors'); // Import the cors middleware



process.config()

const app = express();
const port = 3027;
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

app.use(express.json());

mongoose.connect("mongodb+srv://karunakaryadav167:first1234@cluster0.ep9eaxa.mongodb.net/?retryWrites=true&w=majority").then(()=>{
  console.log("connected to mongo DB")
}).catch(()=>{
  console.log("Error in connecting to mongdb")
});

const User = mongoose.model('User', {
  username: String,
  password: String,
});

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Token missing' });
  }

  jwt.verify(token.split(' ')[1], 'process.env.sk', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
    req.user = user;
    next();
  });
};

app.post('/register', async (req, res) => { 
  const { username, password } = req.body;
  console.log(username)
  console.log(password)


  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ username, password: hashedPassword });
  await user.save();

  res.status(201).json({ message: 'Registration successful' });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const token = jwt.sign({ username: user.username }, 'process.env.sk');
  res.json({ token });
});

app.get('/home', authenticateToken, (req, res) => {
  res.json({ message: `Welcome to the home page, ${req.user.username}!` });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});







































