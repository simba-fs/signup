require('@simba.fs/dotenv').init({
	token_size: 6,
	timeout: 10000,
	renderRootDir: './misc'
});
const signupWithEmail = require('./middleware/signup/signupWithEmail');
const signup = require('./middleware/signup/signup');
const varifyEmail = require('./middleware/signup/varify');

function userSys(config){
	if(config.email === true) return [signupWithEmail, varifyEmail];

	return [signup];
}

module.exports = userSys;
