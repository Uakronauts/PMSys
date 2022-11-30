var { createConn } = require('../sql-connection');
const { queryHighestID } = require('../sql-helpers');

let conn = createConn();

//let iid = (await queryHighestID())[0]["MAX(ID)"] + 1;

//console.log(iid);

let tempSql = `
INSERT INTO DataTable (ID, IssueType, Title, StartDate, EndDate, PercentCompleted, Subsystem, ParentProj)
VALUES (12,'Task', 'Transition Module MasterCam', '2022-09-12', '2022-14-9', 100, 'Manufacturing', 10);
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