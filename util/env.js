require('dotenv').config();

let defaultEnv = {
	DEFAULT_SCOPE: 'd',
	BCRYPT_SALTROUNDS: '10',
	lengthOfCode: '6',
	encodeOfCode: 'abcdefghijklmnopqrstuvwxyz',
	baseURL: 'http://localhost:[port]',
	port: '3000'
}


function getEnv(env){
	if(process.env[env]) return process.env[env];
	let defaultValue = defaultEnv[env];
	if(!defaultValue) return undefined;

	let arg = defaultValue.match(/\[([\w]*)\]/);

	if(arg) for(let i = 1; i < arg.length; i++){
		defaultValue = defaultValue.replace(`[${arg[i]}]`, getEnv(arg[i]));
	}

	return defaultValue;
}

module.exports = getEnv;
