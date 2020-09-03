const router = require('express').Router();
require('@simba.fs/dotenv').init({
	token_size: 6,
	timeout: 10000,
	renderRootDir: './misc'
});
const signupWithEmail = require('./middleware/signup/signupWithEmail');
const signup = require('./middleware/signup/signup');
const varifyEmail = require('./middleware/signup/varify');

/** 
 *	return middleware to signup and email varify
 *	@param {MongoDB Model} User - model to access DB
 *	@param {Object} [config]
 *	@param {Boolean} [config.email=true]
 *	@param {String} [config.signupRoute='/signup']
 *	@param {String} [config.varifyRoute='/varify'] - only enable if config.email === true
 */
function userSys(User, config){
	router.post(config.signupRoute || '/signup', config.email ? signupWithEmail(User) : signup);
	config.email ? router.post(config.varifyRoute || '/signup/varify', varifyEmail(User)) : null;
	return router;
}

userSys.bind({
	signup,
	signupWithEmail,
	varifyEmail
});

module.exports = userSys;
