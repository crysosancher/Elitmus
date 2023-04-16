const {Router} = require('express')
const sessionMiddleware = require('./middleware');

// Require the MongoDB Node.js driver

const { values } = require('../utility/constant')
const authRouter = Router();
authRouter.use(sessionMiddleware);
// Replace the following with your MongoDB Atlas connection string
// const uri = values.url;
// Initialize a new MongoClient instance
// Require the MongoDB Node.js driver
const MongoClient = require("mongodb").MongoClient;

// Connection URI for MongoDB Atlas
const uri =
  "mongodb+srv://naveen:I4tIQp55gZ1OptOl@cluster0.kuyrg.mongodb.net/?retryWrites=true&w=majority";

// Initialize a new MongoClient instance
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
console.log("connected")
	





// Replace the following with your database name and collection name
// const dbName = values.dbName;
const collectionName = 'auth';
async function login(email, password) {
 

  try {
    await client.connect();
	 	console.log("Connected correctly to Mongodb");

  //   const db = client.db("elitmus");

  //   const collection = db.collection(collectionName);
	// 	console.log("hiiiiii")
	// 	//console.log(collection)
	// console.log(email)

    // const user = await collection.findOne();
		//console.log(user)
		const user = await client
    .db("elitmus")
    .collection("auth")
    .findOne({ email: email })
		console.log(user)

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
async function signup(email,password){
	try {
    await client.connect();
	 	console.log("Connected correctly to Mongodb");
		const user = await client
    .db("elitmus")
    .collection("auth")
    .findOne({ email: email })
		console.log(user)

    if (!user) {
			//will add one
      console.log('User not found');
			//insert a new user

			const result = await client.db("elitmus").collection("auth").insertOne({
				email: email,
				password: password
			})
      return true;
    }else{
			console.log('User already exists');
			return false
		}
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}
authRouter.get('/admin',function(req,res,next){
res.render("components/admin/index" ,{tittle: "Elitmus Admin"})
})
authRouter.post('/login', function (req, res,next) {
	console.log(req.body)

	//res.send('Welcome to game route')
	if(req.body.email && req.body.pswd){
		login(req.body.email, req.body.pswd)
		.then((result) => {
			if(result){
				req.session.loggedIn=true
				req.session.email=req.body.email
				let user=req.session.email.split("@")
				res.render("components/start/index" ,{tittle: "Elitmus Puzzle Game",email:user[0]})
			}else{
				res.render("components/Error/error")
			}
		})
		.catch((err) => {
			console.log(err)
			res.render("components/Error/error")
		})
	}
	else{
		res.send("Login Failed").status(401)
	}
})
authRouter.post('/signup',function(req,res,next){
	console.log(req.body)
	if(req.body.email && req.body.pswd){
		signup(req.body.email, req.body.pswd)
		.then((result) => {
			console.log("result=",result)
			if(result){
				console.log("Inside if")
				res.status(200).send("Signup Successful")
			}else{
				console.log("Inside else")
				res.status(401).send("Signup Failed")
			}
		})
		.catch((err) => {
			console.log(err)
			res.status(400).send("Signup Failed in another way")
		})
	}
})
authRouter.get('/logout', function (req, res,next) {
	console.log(req.session)
	req.session.destroy()
	res.redirect('/')
})
module.exports = authRouter