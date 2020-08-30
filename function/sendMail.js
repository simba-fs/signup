const nodemailer = require("nodemailer");
const mailUser = process.env.mailUser;
const mailSender = process.env.mailSender || mailUser.match(/[\w\.]*/)[0];
const mailPW = process.env.mailUser;

let transporter = nodemailer.createTransport({
	host: "mail.gandi.net",
	port: 465,
	secure: true, 
	auth: {
		user: process.env.mailUser, 
		pass: process.env.mailPW, 
	},
});

function sendMail({to, subject, html, text}){
	// error
	if(!html) return new Promise((res, rej) => rej('\'html\' missed'));
	if(!text) return new Promise((res, rej) => rej('\'text\' missed'));
	if(!to) return new Promise((res, rej) => rej('\'to\' missed'));
	if(!subject) return new Promise((res, rej) => rej('\'subject\' missed'));

	return transporter.sendMail({
		from: `"${mailSender}" <${mailUser}>`,
		to: to,
		subject: subject, 
		text: text || '', 
		html: html || '', 
	});
}

module.exports = sendMail;
