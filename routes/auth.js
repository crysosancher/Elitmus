const {Router} = require('express')
// Require the MongoDB Node.js driver

const { values } = require('../utility/constant')
const authRouter = Router();

// Replace the following with your MongoDB Atlas connection string
// const uri = values.url;
// Initialize a new MongoClient instance
// Require the MongoDB Node.js driver
const MongoClient = require("mongodb").MongoClient;

// Connection URI for MongoDB Atlas
const uri =
  "mongodb+srv://naveen:I4tIQp55gZ1OptOl@cluster0.kuyrg.mongodb.net/?retryWrites=true&w=majority";

// Initialize a new MongoClient instance



// Replace the following with your database name and collection name
// const dbName = values.dbName;
const collectionName = 'auth';
async function login(email, password) {
  const client = new MongoClient(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

  try {
    await client.connect();
		console.log("Connected correctly to Mongodb");

    const db = client.db("elitmus");

    const collection = db.collection(collectionName);
		console.log("hiiiiii")
		//console.log(collection)
	console.log(email)

    const user = await collection.findOne();
		//console.log(user)
		const result = await client
    .db("elitmus")
    .collection("auth")
    .findOne({ email: email })
		console.log(result)

    if (!user) {
      console.log('User not found');
      return false;
    }

    if (user.password !== password) {
      console.log('Incorrect password');
      return false;
    }

    console.log('Login successful');
    return true;
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}

authRouter.post('/', function (req, res,next) {
	console.log(req.body)

	//res.send('Welcome to game route')
	if(req.body.email && req.body.pswd){
		login(req.body.email, req.body.pswd)
		.then((result) => {
			if(result){
				res.send("Login Successful").status(200)
			}else{
				res.send("Login Failed").status(401)
			}
		})
		.catch((err) => {
			console.log(err)
			res.send("Login Failed").status(401)
		})
	}
	else{
		res.send("Login Failed").status(401)
	}
})
module.exports = authRouter