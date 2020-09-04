# user-system
User system for web App

# Start
```js
const app = require('express')();
const User = require('./User.js'); // mongodb model
const signup = require('@simba.fs/signup');

app.use(signup(User, config));

// more config in https://simba-fs.github.io/signup

app.listen(3000, () => console.log('listen on port 3000'));
```

# Install
```
npm i @simba.fs/signup --save
```

# Doc
[https://simba-fs.github.io/signup](https://simba-fs.github.io/signup)

# License
[MIT](./LICENSE)

