// To solve issue with connection: https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server

/*
If issue arrises, run:

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your password';
FLUSH PRIVILEGES;

*/

var mysql = require('mysql');

var createConn = function()
{
    let conn = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "RMMLSQL!Mani"
    });
    
    conn.connect(function(err) {
        if (err) {
            throw err;
        }
        console.log(`Connected as ${conn.threadId}`);
    });

    return conn;
}

module.exports = {
    createConn: createConn
};