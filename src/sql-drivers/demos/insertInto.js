var { createConn } = require('../sql-connection');

let conn = createConn();

let tempSql = `
INSERT INTO DataTable (ID, IssueType, Title, StartDate, NumDays, PercentCompleted, Subsystem)
VALUES (8,'Project', 'Rover Body Structure', '2022-8-28', 120, 24, 'Payload');
`;

let tempSq2l = `
DELETE FROM DataTable WHERE ID = 1;

`;

let sql = tempSql;

conn.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log("Value Created", result);
  });

 conn.end();