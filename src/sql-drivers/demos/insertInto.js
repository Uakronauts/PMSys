var { createConn } = require('../sql-connection');
const { queryHighestID } = require('../sql-helpers');

let conn = createConn();

//let iid = (await queryHighestID())[0]["MAX(ID)"] + 1;

//console.log(iid);

let tempSql = `
INSERT INTO DataTable (ID, IssueType, Title, StartDate, EndDate, PercentCompleted, Subsystem, ParentProj)
VALUES (12,'Task', 'Transition Module Manufacturing', '2022-09-14', '2022-10-3', 85, 'Manufacturing', 10);
`;

let tempSq2l = `
DELETE FROM DataTable WHERE ID = 9;

`;

let sql = tempSq2l;

conn.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log("Value Created", result);
  });

 conn.end();