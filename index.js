require('dotenv').config();

const mongoose = require('mongoose');
const User = require('./util/User');

// connect to DB
mongoose.connect(process.env.DB, {useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => console.log('Connected to DB'))
	.catch((e) => {
		console.error(e);
		process.exit(1);
	});

function signup(req, res, next){
	const { username, password, email } = req.body;

	User.find({ username })
		.then(result => {
			if(result.length === 0) return User.create({ username, password, email });
			else return new Promise((res, rej) => rej('User exist'));
		});
}

module.exports = {
	signup
}
