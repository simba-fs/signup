const env = require('./util/env');
const User = require('./util/User');
const Pool = require('@simba.fs/pool');

// express-validator
const { body, validationResult } = require('express-validator');
const errorMiddleware = require('./middleware/error');

// pool
const user = new Pool();

// signup middleware
function signupMiddleware(req, res, next){
	const { username, password, email } = req.body;

	// check if username is in the pool
	if([...user.keys()].find(i => i.username === username)) return res.headersSent || res.status(400).json({
		error: 'The username has been used, but the registration process is not over yet, maybe you can wait or choose another username'
	});

	// check if email is in the pool
	if([...user.keys()].find(i => i.email === email)) return res.headersSent || res.status(400).json({
		error: 'The email has been used, but the registration process is not over yet, maybe you can wait or choose another email'
	});

	User.find({ username })
	// check if username exist
		.then(result => {
			if(result.length !== 0){
				return res.headersSent || res.status(400).json({
					error: 'the username was token, choise another one'
				});
			}
			return User.find({ email });
		})
	// check if email exist
		.then(result => {
			if(result.length !== 0){
				return res.headersSent || res.status(400).json({
					error: 'the email was token, choise another'
				});
			};
			return;
		})
	// write into user pool
		.then(() => {
			let timeout = env('timeout');
			console.log(timeout);
			user.add({
				username,
				email,
				password
			}, timeout);
			res.json({
				message: 'please varify your email'
			});
			console.log(user);
		})
		.catch((e) => {
			console.error(e);
			return res.headersSent || res.json({
				error: 'something error'
			});
		});
	// return res.status(400).json({
	//	error: 'no reply'
	// });
}

let signup = [
	body('username').isString(),
	body('email').isEmail(),
	body('password').isString(),
	errorMiddleware,
	signupMiddleware
]

module.exports = {
	signup
}
