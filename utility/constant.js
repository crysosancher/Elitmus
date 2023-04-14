require('dotenv').config();
const config={
	Port: process.env.PORT || 3000,
}
exports.values=config