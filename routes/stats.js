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
        .insertOne({
          email: email,
          score: { game1: [score] },
          time: { game1: [time] },
          
        })
        .then(() => {
          console.log("inserted");
        });
    } else {
      //Updating existing records
      console.log("user found");
      await client
        .db("elitmus")
        .collection("stats")
        .updateOne(
          { email: email },
          {
            $push: {
              [`score.game1`]: score,
              [`time.game1`]: time,
            },
          }
        )
        .then(() => {
          console.log("inserted");
        });
    }
  } catch (err) {
    console.log(err.stack);
  }
}
async function insert2(email,score){
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
        .insertOne({
          email: email,
          score: { game2: [score] },
          time: { game2: ['0'] },
        })
        .then(() => {
          console.log("inserted");
        });
    } else {
      //Updating existing records
      console.log("user found");
      await client
        .db("elitmus")
        .collection("stats")
        .updateOne(
          { email: email },
          {
            $push: {
              [`score.game2`]: score,
              [`time.game2`]: '0',
            },
          }
        )
        .then(() => {
          console.log("inserted");
        });
    }
  } catch (err) {
    console.log(err.stack);
  }
}
async function insert3(email,score){
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
        .insertOne({
          email: email,
          score: { game3: [score] },
          time: { game3: ['0'] },
        })
        .then(() => {
          console.log("inserted");
        });
    } else {
      //Updating existing records
      console.log("user found");
      await client
        .db("elitmus")
        .collection("stats")
        .updateOne(
          { email: email },
          {
            $push: {
              [`score.game3`]: score,
              [`time.game3`]: '0',
            },
          }
        )
        .then(() => {
          console.log("inserted");
        });
    }
  } catch (err) {
    console.log(err.stack);
  }
}

statsRouter.post("/3", function (req, res, next) {
  console.log("inside insert");
  if (req.session.loggedIn) {
    //console.log(req.body);
    insert3(req.session.email, req.body.score);
    res.send("inserted");
  } else {
    res.redirect("/");
  }
})
statsRouter.post("/2", function (req, res, next) {
  console.log("inside insert");
  if (req.session.loggedIn) {
    console.log(req.body);
    insert2(req.session.email, req.body.score);
    res.send("inserted");
  } else {
    res.redirect("/");
  }
});

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
