var { createConn } = require('../sql-connection');

let conn = createConn();

conn.query("CREATE DATABASE PMSys_Beta", function (err, result) {
    if (err) throw err;
    console.log("Database Created", result);
});