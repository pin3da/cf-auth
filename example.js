var CFAuth = require('./index.js');
var keys = require('./keys.js');

var auth = CFAuth(keys);

var target = 'http://codeforces.com/api/user.rating?handle=Fefer_Ivan';
console.log(auth.genURL(target));
