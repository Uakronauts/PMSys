var { createConn } = require('../sql-connection');

let conn = createConn('testDB');

let sql = `
SELECT *
FROM testTable
`
conn.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });

  conn.end();