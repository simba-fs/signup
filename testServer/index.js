require('@simba.fs/dotenv').init();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

const User = require('./User');

const userSys = require('../index');
const [signup, varifyEmail] = userSys({email: true});

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/signup/varify', varifyEmail(User));
app.use('/signup', signup(User));

app.listen(3000, () => console.log('listen on port 3000'));
