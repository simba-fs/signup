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
 *	@param {Object} User - model to access DB
 *	@param {Object} [config]
 *	@param {Object} [config.email]
 *	@param {Boolean} [config.email.enable=true] - do save email to db
 *	@param {Boolean} [config.email.varify=true] - do varify email before save to db
 *	@param {String} [config.signupRoute=/signup]
 *	@param {String} [config.varifyRoute=/varify] - only enable if config.email === true
 *	@param {Object} [config.env] - env setup
 */
function userSys(User, config){
	if(config.env) Object.assign(process.env, config.env);
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
