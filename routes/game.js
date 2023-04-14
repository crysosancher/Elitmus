// Description: This file contains the routes for the game
const {Router} = require('express')
const gameRouter = Router();
gameRouter.get('/', function (req, res,next) {

	//res.send('Welcome to game route')
	res.render("index", {tittle: "Elitmus Game"})
})
module.exports = gameRouter
// export default gameRouter