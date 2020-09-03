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
	email: true,
	signupRoute: '/signup',
	varifyRoute: '/signup/varify'
}));

app.listen(3000, () => console.log('listen on port 3000'));
