function varifyEmail(User){
	// express-validator
	const { body, validationResult } = require('express-validator');
	const errorMiddleware = require('../../middleware/error');

	// signup middleware
	function varifyEmailMiddleware(req, res, next){
		const {token, email} = req.body;
		User.findOne({ email })
			.then(user => {
				if(!user || user.token !== token) return res.status(400).json({
					error: 'token not match'
				});
				return User.updateOne({ email }, { token: null, varified: true });
			})
			.then(() => res.status(200).json({
				message: 'success'
			}))
			.catch(e => {
				console.error(e);
				res.headersSent || res.status(400).json({
					error: 'something error'
				});
			});
	}

	return [
		body('token').isString(),
		body('email').isEmail(),
		errorMiddleware,
		varifyEmailMiddleware
	];
}

module.exports = varifyEmail;
