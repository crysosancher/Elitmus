const express = require('express')
const gameRouter = require('./routes/game')
const authRouter = require('./routes/auth')
const constants=require('./utility/constant')
const bodyParser = require('body-parser');
const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const path=require('path')

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "views")));
app.use('/game',gameRouter)
app.use('/login',authRouter)
const port=constants.values.Port
app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`)
})
