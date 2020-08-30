require('@simba.fs/dotenv').init({
	token_size: 6,
	timeout: 10000,
	mailMsg: './misc/mailMsg'
});
const signup = require('./middleware/signup');

module.exports = {
	signup
}
