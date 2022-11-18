var { createConn } = require('../sql-connection');

let conn = createConn();

let sql = `
SELECT *
FROM TaskTable
`
conn.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });

  conn.end();