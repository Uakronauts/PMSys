var { createConn } = require('../sql-connection');

let conn = createConn("PMSys");

let sql = `
SHOW FULL TABLES
`

conn.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });

  conn.end();