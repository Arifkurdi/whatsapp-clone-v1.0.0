//  importing
import express from "express";
import mongoose from "mongoose";
import Pusher from "pusher";
import Messages from "./dbMessages.js";
import cors from "cors";

// app config
const app = express();

const PORT = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: "1384751",
  key: "2236d1a468de40f73e18",
  secret: "f95678f4760a6d8f31dc",
  cluster: "eu",
  useTLS: true,
});

pusher.trigger("my-channel", "my-event", {
  message: "hello world",
});
// middlesware
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});
// Db Config
const connection_url =
  "mongodb+srv://Admin:A5RQSx91NdWWeXC4@cluster0.ptozw.mongodb.net/tiktokCloneDb?retryWrites=true&w=majority";

mongoose.connect(connection_url, {
  //   useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("DB Is Connected");
  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    console.log("changeing");
    const messageDetail = change.fullDocument;
    if (change.operationType === "insert") {
      pusher.trigger("messages", "inserted", {
        name: messageDetail.name,
        message: messageDetail.message,
        timestamp: messageDetail.timestamp,
        recived: messageDetail.recived,
      });
    } else {
      console.log("False Pusher");
    }
  });
});

// routes
app.get("/", (req, res) => {
  res.status(200).send("helloWord");
});

app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
// lestening

app.listen(PORT, () => console.log(`Listening On ${PORT}`));
