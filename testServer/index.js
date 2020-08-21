const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { signup } = require('../index');

app.use(bodyParser.json());
app.use('/signup', signup);

app.listen(3000, () => console.log('listen on port 3000'));
