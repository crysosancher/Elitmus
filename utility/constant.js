require('dotenv').config();
const config={
	Port: process.env.PORT || 3000,
	url: process.env.mongoDbUrl||"",
	dbName: process.env.dbName,
}
exports.values=config