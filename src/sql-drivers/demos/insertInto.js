var { createConn } = require('../sql-connection');

let conn = createConn('testDB');

let sql = `
INSERT INTO testTable VALUES ('Chris', 5)
`

conn.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log("Value Created", result);
  });

 conn.end();