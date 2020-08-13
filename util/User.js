const mongoose = require('mongoose');
const promission = require('./promission');

const User = mongoose.model('User', {
	username: {
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
