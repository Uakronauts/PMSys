var { createConn } = require('../sql-connection');
const { RDPToText, resToText } = require('../sql-helpers');

let conn = createConn();

let sql = `
DROP TABLE DataTable`

// conn.query(sql, function (err, result, fields) {
//     if (err) throw err;
//     console.log("Value Created", result);
//   });


// sql = `
// SELECT *
// FROM testtable
// ORDER BY name ASC
// `

conn.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log("Values Obtained", result);

    console.log(resToText(result));
  });

 conn.end();