var crypto = require('crypto');
var randomString = require('randomstring');
var url = require('url');
var querystring = require('querystring');

module.exports = CFAuth;

function CFAuth(opts) {
  if (!(this instanceof CFAuth))
    return new CFAuth(opts);

  if (!opts)
    opts = {};

  this._options = opts;
}

CFAuth.prototype.genURL = function(original) {
  var ans = original;
  var time = parseInt(Date.now() / 1000);
  var pref = randomString.generate(6);
  var ori  = url.parse(original);
  var query = querystring.parse(ori.query);
  var method = /api.(.*)/.exec(ori.pathname);
  if (method)
    method = method[1];

  var params = [
    ['apiKey', this._options.key],
    ['time', '' + time]
  ];

  for (var i in query) {
    var t = [i, query[i]];
    params.push(t);
  }

  params.sort(function (x, y) {
    if (x[0] == y[0])
      return x[1].localeCompare(y[1]);
    return x[0].localeCompare(y[0]);
  });

  var toHash = pref + '/' + method + '?';
  for (var i = 0; i < params.length; ++i) {
    if (i > 0) toHash += '&';
    toHash += (params[i][0] + '=' + params[i][1]);
  }
  toHash += '#' + this._options.secret;

  var hash = crypto.createHash('sha512');
  var hash = hash.update(toHash, 'utf8').digest('hex');

  var ans = original;
  if (query !== {}) {
    ans += '&';
  }
  ans += 'apiKey=' + this._options.key + '&time=' + time + '&apiSig=' + pref;
  return ans + hash;
}

