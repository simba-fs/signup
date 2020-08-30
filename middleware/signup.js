const User = require('../util/User');
const Pool = require('@simba.fs/pool');
const sendMail = require('../function/sendMail');
const mailMsg = require('../' + process.env.mailMsg);

// token
const randomToken = require('random-token');
const genToken = () => randomToken.create('0123456789')(process.env.token_size);

// express-validator
const { body, validationResult } = require('express-validator');
const errorMiddleware = require('../middleware/error');

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
			let timeout = process.env.timeout;
			let token = genToken();
			let localMailMsg = mailMsg
				.replace('{username}', username)
				.replace('{email}', email)
				.replace('{token}', token);
			user.add({
				username,
				email,
				password,
				token
			}, timeout);
			res.json({
				message: 'please varify your email'
			});
			return sendMail({
				to: email,
				subject: 'Please varify you email',
				text: localMailMsg,
				html: `<pre>${localMailMsg}</pre>`
			})
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

module.exports = signup;
