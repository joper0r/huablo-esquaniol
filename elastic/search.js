var client = require('./connection.js');

client.search({
  index: 'amazon',
  type: 'books',
  q: 'PostName:Node.js'
}).then(function(resp) {
  console.log(resp);
}, function(err) {
  console.trace(err.message);
});