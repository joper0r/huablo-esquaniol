var client = require('./connection.js');

client.delete({  
  index: 'amazon',
  id: '1',
  type: 'books'
},function(err,resp,status) {
    console.log(resp);
});