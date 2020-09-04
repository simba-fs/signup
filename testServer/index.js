require('@simba.fs/dotenv').init();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

const User = require('./User');

const userSys = require('..');

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(userSys(User, {
	email: {
		enable: true,
		varify: true
	},
	signupRoute: '/signup',
	varifyRoute: '/signup/varify',
	env: {
		token_size: 6,
		timeout: 1000000000,
		mailUser: 'someone@mail.server',
		mailPW: 'HaHaThisIsPassword',
		mailSender: 'AppName',
		renderRootDir: './misc',
	}
}));

app.listen(3000, () => console.log('listen on port 3000'));
