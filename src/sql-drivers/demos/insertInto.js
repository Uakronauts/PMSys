var { createConn } = require('../sql-connection');

let conn = createConn();

let tempSql = `
INSERT INTO DataTable (ID, IssueType, Title, StartDate, EndDate, PercentCompleted, Subsystem, ParentProj)
VALUES (4,'Task', 'Create wiring schematic & PCB', '2022-9-01', '2022-10-15', 100, 'Avionics', 1);
`;

let tempSq2l = `
DELETE FROM DataTable WHERE ID > 0;

`;

let sql = tempSql;

conn.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log("Value Created", result);
  });

 conn.end();