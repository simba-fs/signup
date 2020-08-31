const fs = require('fs');
const ejs = require('ejs');

function render(file){
	if(process.env.renderRootDir) file = '../' + process.env.renderRootDir + '/' + file;
	return ejs.compile(fs.readFileSync(file, 'utf8'));
}
