var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'agisnotamused',
  database : 'booksapi'
});
connection.connect(function(err){
if(!err) {
    console.log("Database is connected on port 5000");
} else {
    console.log("Error connecting database ... nn");
}
});

exports.login = function(req,res){
    var user_name= req.body.user_name;
    var user_pw = req.body.user_pw;
    connection.query('SELECT * FROM user WHERE user_name = ?',[user_name], function (error, results, fields) {
    if (error) {
      // console.log("error ocurred",error);
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{
      // console.log('The solution is: ', results);
      if(results.length >0){
        if([0].user_pw == user_pw){
          res.send({
            "code":200,
            "success":"login sucessfull"
              });
        }
        else{
          res.send({
            "code":204,
            "success":"user and password does not match"
              });
        }
      }
      else{
        res.send({
          "code":204,
          "success":"user does not exits"
            });
      }
    }
    });
  }
