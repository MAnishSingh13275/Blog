const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");
const Post = require("./models/Post");

const app = express();

const salt = bcrypt.genSaltSync(10);
const secret = "aicurb7qyr938q7r9qy84yr98yxn";
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

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
      res.cookie("token", token).json({
        id: createUser._id,
        email,
      });
    });
  } else {
    res.status(400).json("Wrong Credentials");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post("/LogOut", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.post("/Post", uploadMiddleware.single("file"), async (req, res) => {
  try {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    const { title, summary, content } = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
    });
    res.json({ postDoc });
  } catch (error) {
    res.status(404).json(error);
  }
});

app.get("/Post", async (req, res) => {
  res.json(await Post.find().sort({ createdAt: -1 }).limit(20));
});

app.listen(4000);

//

//mongodb+srv://manishsingh13275:Ofdcm5HjAyKsokBM@cluster0.6avok8s.mongodb.net/?retryWrites=true&w=majority
