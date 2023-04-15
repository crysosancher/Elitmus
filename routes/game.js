// Description: This file contains the routes for the game
const {Router} = require('express')
const sessionMiddleware = require('./middleware');
const gameRouter = Router();
gameRouter.use(sessionMiddleware);
gameRouter.get('/start', function (req, res,next) {
	if(req.session.loggedIn){
	res.send('Welcome to game start route')}
	else{
		res.redirect('/')
	}
})
gameRouter.get('/', function (req, res,next) {

	//res.send('Welcome to game route')
	res.render("index", {tittle: "Elitmus Game"})
})
module.exports = gameRouter
// export default gameRouter