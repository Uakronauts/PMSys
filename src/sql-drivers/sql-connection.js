// To solve issue with connection: https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server

/*
If issue arrises, run:

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your password';
FLUSH PRIVILEGES;

*/

var mysql = require('mysql');


const HOSTNAME = "pmsys.cveq8mxavi6m.us-east-2.rds.amazonaws.com";
const PORT = "3306";

const USER = "admin";
const PASSWORD = "PMSYSAkronauts!EhS#001";


// Create a connection to a given database (default to PMSys DB)
var createConn = function(dbName = 'PMSys')
{
    let conn = mysql.createConnection({
        host: HOSTNAME,
        port: PORT,
        user: USER,
        password: PASSWORD,

        database: dbName
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