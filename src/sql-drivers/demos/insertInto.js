var { createConn } = require('../sql-connection');

let conn = createConn();

let tempSql = `
INSERT INTO SubsystemsTable (Name, ParentSys)
VALUES ('Marketing','ASL');
`;

let sql = tempSql;

conn.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log("Value Created", result);
  });

 conn.end();