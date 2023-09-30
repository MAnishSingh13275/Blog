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
  const { username, password, email } = req.body;
  try {
    if (username === "" || password === "" || email === "") {
      res.status(400).json("Fill all Fields");
    } else {
      const createUser = await User.create({
        username,
        password: bcrypt.hashSync(password, salt),
        email,
      });
      res.json(createUser);
    }
  } catch (error) {
    res.status(400).json(error);
  }
});
app.post("/Login", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const createUser = await User.findOne({ email, username });
    const passOk = bcrypt.compareSync(password, createUser.password);
    if (passOk) {
      jwt.sign(
        { email, username, id: createUser.id },
        secret,
        {},
        (err, token) => {
          if (err) throw err;
          try {
            res.cookie("token", token).json({
              id: createUser._id,
              email,
              username,
            });
          } catch (error) {
            res.json(error);
          }
        }
      );
    } else {
      res.status(400).json("Wrong Credentials");
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

app.get("/profile", (req, res) => {
  try {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
      if (err) throw err;
      res.json(info);
    });
  } catch (error) {
    res.json(error);
  }
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
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
      if (err) throw err;
      const { title, summary, content } = req.body;
      const postDoc = await Post.create({
        title,
        summary,
        content,
        cover: newPath,
        author: info.id,
      });
      res.json({ postDoc });
    });
  } catch (error) {
    res.status(404).json(error);
  }
});

// app.put("/post", uploadMiddleware.single("file"), async (req, res) => {});
app.put("/post", uploadMiddleware.single("file"), async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { id, title, summary, content } = req.body;
    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    await postDoc.updateOne({
      title,
      summary,
      content,
      cover: newPath ? newPath : postDoc.cover,
    });
    res.json(postDoc)
  });
});

app.get("/Post", async (req, res) => {
  res.json(await Post.find().populate("author", ["username"]));
});

// .sort({ createdAt: -1 }).limit(20)

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate("author", ["username"]);
  res.json(postDoc);
});

app.listen(4000);

//

//mongodb+srv://manishsingh13275:Ofdcm5HjAyKsokBM@cluster0.6avok8s.mongodb.net/?retryWrites=true&w=majority
