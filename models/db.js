var configDB = {
  'url' : 'mongodb://192.168.59.103:27017' // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot
};
var db = require('monk')(configDB.url);
var users = db.get('users');
var repos = db.get('repos');
users.index('name last');

module.exports = {
  "users" : users,
  "repos" : repos
};
