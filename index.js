require('@simba.fs/dotenv').init({
	token_size: 6,
	timeout: 10000
});
const signup = require('./middleware/signup');

module.exports = {
	signup
}
