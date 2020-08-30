const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

const { signup, varifyEmail } = require('../index');

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/signup/varify', varifyEmail);
app.use('/signup', signup);

app.listen(3000, () => console.log('listen on port 3000'));
