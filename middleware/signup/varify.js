function varifyEmail(User){
	const user = require('./data');

	// express-validator
	const { body, validationResult } = require('express-validator');
	const errorMiddleware = require('../../middleware/error');

	// signup middleware
	function varifyEmailMiddleware(req, res, next){
		const {token, email} = req.body;
		let thatUser = [...user].find(i => i.token === token && i.email === email);

		if(!thatUser) return res.status(400).json({
			error: 'token error'
		});

		User.create({
			username: thatUser.username,
			password: thatUser.password,
			email: thatUser.email
		}).then(user => {
			res.status(200).json(user);
		}).catch(e => {
			console.error(e);
			res.status(400).json({
				error: 'server error'
			})
		})
	}

	return [
		body('token').isString(),
		body('email').isEmail(),
		errorMiddleware,
		varifyEmailMiddleware
	];
}

module.exports = varifyEmail;
