const {Router} = require('express')
const authRouter = Router();

authRouter.post('/', function (req, res,next) {

	//res.send('Welcome to game route')
	console.log(req.body)
	res.send("Login Successful").status(200)
})
module.exports = authRouter