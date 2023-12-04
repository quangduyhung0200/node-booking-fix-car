import mysql from 'mysql2'


// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt-nodejs-react'
});

// simple query



const HandleHelloWorld = (req, res) => {
    return res.render("home.ejs");
}
const HandleUser = (req, res) => {
    return res.render("user.ejs");
}
const HandleCreateUser = (req, res) => {
    console.log('req: ', req.body)
    let email = req.body.email
    let username = req.body.username
    let password = req.body.pswd
    connection.query(
        'INSERT INTO users(email, password,username)VALUES(?,?, ?)', [email, password, username],
        function (err, results, fields) {
            console.log(results); // results contains rows returned by server
            console.log(fields); // fields contains extra meta data about results, if available
        }
    );
    return res.send("ok");
}
module.exports = {
    HandleUser, HandleHelloWorld, HandleCreateUser
}