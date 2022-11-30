var { createConn } = require('../sql-connection');

let conn = createConn();

let tempSql = `
INSERT INTO DataTable (ID, IssueType, Title, StartDate, EndDate, PercentCompleted, Subsystem, ParentProj)
VALUES (7,'Task', 'Create basic GUI for mobile platforms', '2022-10-01', '2022-12-17', 40, 'Avionics', 5);
`;

let tempSq2l = `
DELETE FROM DataTable WHERE ID > ;

`;

let sql = tempSql;

conn.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log("Value Created", result);
  });

 conn.end();