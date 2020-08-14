const Pool = require('./pool');
const user = new Pool;

user.add({ 
	scope: 'kenny',
	code: 'asdf'
});
user.add({ 
	scope: 'kenny',
	code: 'qwer'
});
user.add({ 
	scope: 'simba',
	code: 'asdf'
});

user.remove({ 
});
console.log(user.pool);
