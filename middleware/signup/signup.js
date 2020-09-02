function signup(User){
	module.paths.push(process.cwd());
	const sendMail = require('function/sendMail');
	const render = require('function/render');
	// const text = require('html-to-text').fromString;

	// express-validator
	const { body, validationResult } = require('express-validator');
	const errorMiddleware = require('../../middleware/error');

	// signup middleware
	function signupMiddleware(req, res, next){
		const { username, password } = req.body;

		User.findOne({ username })
			.then(result => {
				if(!result) return;
				if(result.username === username) return res.headersSent || res.status(400).json({
					error: 'username used'
				});
			})
		// write into user pool
			.then(() => {
				return User.create({
					username,
					password
				})
			})
			.then(user => {
				let mailMsg = render('mailMsg')({
					appName: 'User System',
					appNameTW: 'User System',
					username: user.username
				});
				res.headersSent || res.json({
					message: 'success'
				});
				return sendMail({
					to: email,
					subject: 'Wellcome to User System',
					text: mailMsg,
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
		body('password').isString(),
		errorMiddleware,
		signupMiddleware
	];
}


module.exports = signup;
