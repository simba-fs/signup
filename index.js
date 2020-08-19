const env = require('./util/env');
const mongoose = require('mongoose');
const User = require('./util/User');
const Pool = require('@simba.fs/pool');

const user = new Pool();

// connect to DB
mongoose.connect(env('DB'), {useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => console.log('Connected to DB'))
	.catch((e) => {
		console.error(e);
		process.exit(1);
	});

// signup middleware
function signup(req, res, next){
	const { username, password, email } = req.body;

	User.find({ username })
	// check if username exist
		.then(result => {
			if(result.length !== 0){
				if([...user.keys()].find(i => i.username === username)) return res.headersSent || res.status(400).json({
					error: 'username is used but not cmplete register process, maybe you can wait or choise another username'
				});
				else return res.headersSent || res.status(400).json({
					error: 'the username was token, choise another one'
				});
			}
			return User.find({ email });
		})
	// check if email exist
		.then(result => {
			if(result.length !== 0){
				if([...user.keys()].find(i => i.email === email)) return res.headersSent || res.status(400).json({
					error: 'email is used but not cmplete register process, maybe you can wait or choise another'
				});
				else return res.headersSent || res.status(400).json({
					error: 'the email was token, choise another'
				});
			};
		})
	// write into user pool
		.then(() => {
			let timeout = env('timeout');
			user.add({
				username,
				email,
				password
			}, timeout);
		})
		.catch((e) => {
			console.error(e);
			return res.headersSent || res.json({
				error: 'something error'
			});
		})
}

module.exports = {
	signup
}
