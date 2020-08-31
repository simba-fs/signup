function signup(User){
	const sendMail = require('../../function/sendMail');

	// token
	const randomToken = require('random-token');
	const genToken = () => randomToken.create('0123456789')(process.env.token_size);

	// express-validator
	const { body, validationResult } = require('express-validator');
	const errorMiddleware = require('../../middleware/error');

	// signup middleware
	function signupMiddleware(req, res, next){
		const { username, password, email } = req.body;

		User.find({
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
				let localMailMsg = mailMsg
					.replace(/{username}/g, username)
					.replace(/{email}/g, email)
					.replace(/{token}/g, token);
				user.add({
					username,
					email,
					password,
					token
				}, timeout);
				console.log(token);
				res.headersSent || res.json({
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
