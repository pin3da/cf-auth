cf-auth
=======

cf-auth is an authenticator for the [Codeforces API](http://codeforces.com/api/help)

Install
=======

    npm install cf-auth
    
Usage
=====

you can use it from command line by passing a 'keys file' and a target url.

    cfauth "path_to_keys" "target_URL"

Example using curl:

    cfauth  "my_keys.js" "http://codeforces.com/api/contest.status?contestId=566&from=1&count=10" | xargs curl

You also can require it from another nodejs program:

```javascript
var CFAuth = require('./index.js');
var keys = require('./keys.js');

var auth = CFAuth(keys);

var target = 'http://codeforces.com/api/user.rating?handle=Fefer_Ivan';
console.log(auth.genURL(target));
```

Licensing
=========

The project is released under the MPLv2 license.

Please see LICENSE for full details.
