// Description: This file contains the routes for the game
const { Router } = require("express");
const sessionMiddleware = require("./middleware");
const gameRouter = Router();
gameRouter.use(sessionMiddleware);
const MongoClient = require("mongodb").MongoClient;

// Connection URI for MongoDB Atlas
const uri =
  "mongodb+srv://naveen:I4tIQp55gZ1OptOl@cluster0.kuyrg.mongodb.net/?retryWrites=true&w=majority";

// Initialize a new MongoClient instance
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
console.log("connected");
gameRouter.get("/final", async function (req, res, next) {
  if (req.session.loggedIn && req.session.game1 && req.session.game2 && req.session.game3) {
    try {
      await client.connect();
      console.log("Connected correctly to Mongodb");
      //if()
      const user = await client
        .db("elitmus")
        .collection("stats")
        .findOne({ email: req.session.email });
        //console.log(user)
        // if(!(user.game1=='true' && user.game2=='true' && user.game3=='true')){
        //   res.redirect('/')
        // }
      //console.log("user====", user.score.game1);
      res.render("components/final/index", {
        tittle: "Elitmus Puzzle Game",
        email: req.session.email,
        score: user.score
          ? (user.score.game1[user.score.game1.length - 1] +
            user.score.game2[user.score.game2.length - 1] +
            user.score.game3[user.score.game3.length - 1])
          : 0,
      });
    } catch (err) {
      console.log(err.stack);
    } finally {
      await client.close();
    }
  } else {
    res.redirect("/");
  }
});
gameRouter.get("/3", function (req, res, next) {
  if (req.session.loggedIn && req.session.game1 && req.session.game2) {
    req.session.game3 = true;
    res.render("components/3/index", {
      tittle: "Elitmus Puzzle Game 3",
      email: req.session.email,
    });
  } else {
    res.redirect("/");
  }
});
gameRouter.get("/1", function (req, res, next) {
  
  if (req.session.loggedIn) {
    req.session.game1 = true;
    res.render("components/1/index", {
      tittle: "Elitmus Puzzle Game 1",
      email: req.session.email,

    });
  } else {
    res.redirect("/");
  }
});
gameRouter.get("/2", function (req, res, next) {
  if (req.session.loggedIn && req.session.game1) {
    req.session.game2 = true;
    res.render("components/2/index", {
      tittle: "Elitmus Puzzle Game 2",
      email: req.session.email,
    });
  } else {
    res.redirect("/");
  }
});
//@starting page after login
gameRouter.get("/start", function (req, res, next) {
  if (req.session.loggedIn) {
    res.send("Welcome to game start route");
  } else {
    res.redirect("/");
  }
});
//@starting page before login
gameRouter.get("/", function (req, res, next) {
  //res.send('Welcome to game route')
  res.render("index", { tittle: "Elitmus Game" });
});
module.exports = gameRouter;
// export default gameRouter
