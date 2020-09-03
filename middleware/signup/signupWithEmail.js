function signup(User){
	module.paths.push(process.cwd());
	const sendMail = require('function/sendMail');
	const render = require('function/render');
	const text = require('html-to-text').fromString;

	// token
	const genToken = require('function/random')();

	// express-validator
	const { body, validationResult } = require('express-validator');
	const errorMiddleware = require('../../middleware/error');

	// signup middleware
	function signupMiddleware(req, res, next){
		const { username, password, email } = req.body;

		User.findOne({
			$or: [{username}, {email}]
		})
			.then(result => {
				if(!result) return;
				if(result.username === username) return res.headersSent || res.status(400).json({
					error: 'username used'
				});
				if(result.email === email) return res.headersSent || res.status(400).json({
					error: 'email used'
				});
			})
		// write into user pool
			.then(() => {
				let token = genToken();
				return User.create({
					username,
					email,
					password,
					token
				})
			})
			.then(user => {
				let mailMsg = render('mailMsg')({
					appName: 'User System',
					appNameTW: 'User System',
					email: user.email,
					username: user.username,
					token: user.token
				});
				res.headersSent || res.json({
					message: 'please varify your email'
				});
				return sendMail({
					to: email,
					subject: 'Please varify you email',
					text: text(mailMsg),
					html: mailMsg
				})
			})
			.catch((e) => {
				console.error(e);
				return res.headersSent || res.json({
					error: 'something error'
				});
			});
	}

	return signup = [
		body('username').isString(),
		body('email').isEmail(),
		body('password').isString(),
		errorMiddleware,
		signupMiddleware
	];
}


module.exports = signup;
