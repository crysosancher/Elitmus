// Description: This file contains the routes for the game
const {Router} = require('express')
const sessionMiddleware = require('./middleware');
const gameRouter = Router();
gameRouter.use(sessionMiddleware);
gameRouter.get('/1',function(req,res,next){
	if(req.session.loggedIn){
	res.render("components/1/index",{tittle: "Elitmus Puzzle Game",email:req.session.email})}
	else{
		res.redirect('/')
	}

})
gameRouter.get('/2',function(req,res,next){
if(req.session.loggedIn){
	res.render("components/2/index",{tittle: "Elitmus Puzzle Game",email:req.session.email})
}else{
	res.redirect('/')
}
})
//@starting page after login
gameRouter.get('/start', function (req, res,next) {
	if(req.session.loggedIn){
	res.send('Welcome to game start route',)}
	else{
		res.redirect('/')
	}
})
//@starting page before login
gameRouter.get('/', function (req, res,next) {

	//res.send('Welcome to game route')
	res.render("index", {tittle: "Elitmus Game"})
})
module.exports = gameRouter
// export default gameRouter