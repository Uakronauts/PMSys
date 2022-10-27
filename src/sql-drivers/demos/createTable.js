var { createConn } = require('../sql-connection');

let conn = createConn('testDB');

var sql = `
CREATE TABLE testTable
(
    name VARCHAR(255) PRIMARY KEY,
    id INT
);
`;

conn.query(sql, function (err, result) {
if (err) throw err;
console.log("Table Created", result);
});

conn.end();