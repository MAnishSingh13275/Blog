const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();

const salt = bcrypt.genSaltSync(10);
const secret = "aicurb7qyr938q7r9qy84yr98yxn";
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(
  "mongodb+srv://manishsingh13275:Ofdcm5HjAyKsokBM@cluster0.6avok8s.mongodb.net/?retryWrites=true&w=majority"
);

app.post("/SignUp", async (req, res) => {
  const { userName, password, email } = req.body;
  try {
    const createUser = await User.create({
      userName,
      password: bcrypt.hashSync(password, salt),
      email,
    });
    res.json(createUser);
  } catch (error) {
    res.status(400).json(error);
  }
});
app.post("/Login", async (req, res) => {
  const { password, email } = req.body;
  const createUser = await User.findOne({ email });
  const passOk = bcrypt.compareSync(password, createUser.password);
  if (passOk) {
    jwt.sign({ email, id: createUser.id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie('token', token).json('Ok')
    });
  } else {
    res.status(400).json("Wrong Credentials");
  }
});

// app.use("/profile", async (req, res) => {
//   res.json(req.cookies);
// });

app.listen(4000);

//

//mongodb+srv://manishsingh13275:Ofdcm5HjAyKsokBM@cluster0.6avok8s.mongodb.net/?retryWrites=true&w=majority
