var http = require('http');
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cors = require('cors');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Aznstreet123!',
    database : 'swagnesdev',
    insecureAuth : true 
});

connection.connect(function(err) {
    if (err) throw err
    console.log("MySQL Connection Successful")
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended : true
}));
app.use(cors());

var server = app.listen(2999, "localhost", function() {
    var host = server.address().address
    var port = server.address().port
    console.log("Listening at http://%s:%s", host, port)
});

// code to insert data
app.post('/Join', (req, res) => {
    const name = req.body.name;
    console.log(name);
    const password = req.body.password;
    console.log(password);
    const email = req.body.email;
    console.log(email);
    const REGISTER_USER_QUERY = `INSERT INTO users (name, password, email) VALUES ('${name}', '${password}', '${email}');`;
    connection.query(REGISTER_USER_QUERY, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send('Successfully registered player');
        }
    });
});

// code to insert data
app.get('/add', (req, res) => {
    const {name, password, email} = req.query;
    const REGISTER_USER_QUERY = `INSERT INTO users (name, password, email) VALUES ('${name}', '${password}', '${email}');`;
    connection.query(REGISTER_USER_QUERY, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send('Successfully registered player');
        }
    });
});