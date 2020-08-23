const env = require('../util/env');

module.exports = getToken;
	
function getToken(){
	token = Math.floor(Math.random() * Math.pow(10, env('token_size') * 10)) % Math.pow(10, env('token_size'));
	console.log(token);
}
