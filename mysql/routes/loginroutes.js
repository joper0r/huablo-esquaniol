var mysql = require('mysql');
var bcrypt = require('bcrypt');
const saltRounds = 10;

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'agisnotamused',
    database: 'booksapi'
});
connection.connect(function (err) {
    if (!err) {
        console.log("Database is connected on port 5000");
    } else {
        console.log("Error connecting database ... nn");
    }
});

exports.login = function (req, res) {
    var name = req.body.user_name;
    var password = req.body.user_pw;
    connection.query('SELECT * FROM user WHERE user_name = ?', [name], function (error, results, fields) {
        if (error) {
            console.log("error ocurred", error);
            res.status(400).send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {

            if (results.length > 0) {

                var check = bcrypt.compareSync(password, results[0].user_pw);
                if (check) {

                    res.send({
                        "code": 200,
                        "success": "login sucessfull",
                        "data": {
                            "userID": results[0].ID
                        }
                    });
                } else {
                    res.status(401).send({
                        "code": 401,
                        "success": "user and password does not match"
                    });
                }
            } else {
                res.status(404).send({
                    "code": 404,
                    "success": "user does not exits"
                });
            }
        }
    });
}

exports.createUser = function (req, res) {
    var name = req.body.user_name;
    var password = req.body.user_pw;
    var hash = bcrypt.hashSync(password, 4);
    var value = [[name, hash]];

    connection.query('INSERT INTO user (user_name, user_pw) VALUES ?', [value], function (error, results, fields) {
        if (error) {
            console.log("error ocurred", error);
            res.status(400).send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {

            res.send({
                "code": 200,
                "success": "User Created!"
            });
        }
    });
}