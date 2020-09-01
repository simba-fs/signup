const mongoose = require('mongoose');
const promission = require('./promission');

// connect to DB
mongoose.connect(process.env.DB, {useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => console.log('Connected to DB'))
	.catch((e) => {
		console.error(e);
		process.exit(1);
	});

const User = mongoose.model('User', {
	username: {
		type: String,
		required: true
	},
	token: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	promission: {
		type: String,
		default: promission.getDefault
	},
	deleted: {
		type: Boolean,
		default: false
	},
	createAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = User;
