const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser);
app.use(require('../index'));

app.use((req, res, next) => {
	res.status(400).json({error: 'error'});
})
