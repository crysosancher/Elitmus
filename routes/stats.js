const { Router } = require("express");
const sessionMiddleware = require("./middleware");
const statsRouter = Router();
statsRouter.use(sessionMiddleware);
const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://naveen:I4tIQp55gZ1OptOl@cluster0.kuyrg.mongodb.net/?retryWrites=true&w=majority";

// Initialize a new MongoClient instance
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
console.log("connected");
async function insert1(email, score, time) {
  try {
    await client.connect();
    console.log("Connected correctly to Mongodb");

    const user = await client
      .db("elitmus")
      .collection("stats")
      .findOne({ email: email });
    console.log(user);
    if (!user) {
      //Entering new records
      console.log("user not found");
      await client
        .db("elitmus")
        .collection("stats")
        .insertOne({ email: email, score: [score], time: [time] })
        .then(() => {
          console.log("inserted");
        });
    } else {
      //Updating existing records
      console.log("user found");
      await client
        .db("elitmus")
        .collection("stats")
        .updateOne({ email: email }, { $push: { score: [score], time: [time] } })
        .then(() => {
          console.log("inserted");
        });
    }
  } catch (err) {
    console.log(err.stack);
  }
}
statsRouter.post("/1", function (req, res, next) {
  console.log("inside insert");
  if (req.session.loggedIn) {
    console.log(req.body);
    insert1(req.session.email, req.body.score, req.body.time);
    res.send("inserted");
  } else {
    res.redirect("/");
  }
});
module.exports = statsRouter;
