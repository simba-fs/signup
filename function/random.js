const r = lim => Math.floor(Math.random()*lim);

/**
 *	return random string
 */
function random(){
	let salt = this.salt;
	let len = this.len;
	let lim = salt.length;
	let token = '';
	if(typeof salt !== 'string' || len < 0) return token;
	while(len --) token += salt[r(lim)];
	return token;
}
random.salt = '0123456789';
random.len = 6;

/**
 *	return random function
 *	@param {String} [salt='0123456789']
 *	@param {Number} [length=6]
 *	@return {Function}
 */
function genrate(salt='0123456789', len=6){
	if(typeof salt !== 'string' || len < 0) throw new Error('salt not string or len less than 0');
	this.salt = salt;
	this.len = len;
	return random;
}

module.exports = genrate;
