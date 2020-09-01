const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

function render(file){
	let root = process.env.renderRootDir || process.cwd();	
	if(/^\.{1,2}\//.test(file)){
		file = path.join(root, file);
	}else{
		file = path.join(root, file+'.ejs');
	}
	return ejs.compile(fs.readFileSync(file, 'utf8'));
}

module.exports = render;
