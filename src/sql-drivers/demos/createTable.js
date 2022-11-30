var { createConn } = require('../sql-connection');

let conn = createConn();

var table =

// `
// CREATE TABLE SystemsTable
// (
//     Name VARCHAR(64),
//     Description VARCHAR(512),

//     PRIMARY KEY (Name)
// );
// `

// `
// CREATE TABLE SubsystemsTable
// (
//     Name VARCHAR(64),
//     Description VARCHAR(512),

//     ParentSys VARCHAR(64),
//     FOREIGN KEY (ParentSys) REFERENCES SystemsTable(Name),

//     PRIMARY KEY (Name)
// );`

`CREATE TABLE DataTable
(
    ID INT,
    IssueType VARCHAR(64),

    Title VARCHAR(64),
    Description VARCHAR(512),

    StartDate DATE,
    EndDate DATE,

    PercentCompleted INT NOT NULL,

    Assignee VARCHAR(64),
    Subsystem VARCHAR(64),

    ParentProj INT,

    FOREIGN KEY (Subsystem) REFERENCES SubsystemsTable(Name),
    
    CHECK (PercentCompleted >= 0 AND PercentCompleted <= 100),

    PRIMARY KEY (ID)
);
`;


let sql = table;

conn.query(sql, function (err, result) {
if (err) throw err;
console.log("Table Created", result);
});

conn.end();