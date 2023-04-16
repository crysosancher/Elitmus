const express = require('express')
const startRouter = require('./routes/game')
const statsRouter = require('./routes/stats')
const authRouter = require('./routes/auth')
const constants=require('./utility/constant')
const bodyParser = require('body-parser');
const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const path=require('path');
const { Stats } = require('fs');

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "views")));

// const requireAuth = (req, res, next) => {
//   if (req.session.loggedIn) {
//     next();
//   } else {
//     res.redirect('/auth/login');
//   }
// };
app.use('/insert',statsRouter)
app.use('/',startRouter)
app.use('/auth',authRouter)
const port=constants.values.Port
app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`)
})
