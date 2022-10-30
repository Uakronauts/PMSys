var { createConn } = require('../sql-connection');

let conn = createConn('testDB');

// let sql = `
// SELECT name
// FROM testtable
// WHERE id > 1
// `

// conn.query(sql, function (err, result, fields) {
//     if (err) throw err;
//     console.log("Value Created", result);
//   });


sql = `
SELECT *
FROM testtable
ORDER BY name ASC
`

conn.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log("Values Obtained", result);

    console.log(result[0]);
  });

 conn.end();