var { createConn } = require('../sql-connection');

let conn = createConn();

var table = null;
// `
// CREATE TABLE SubsystemChildProjects
// (
//     parentSubsystemName VARCHAR(64) NOT NULL,
//     childProjectID INT NOT NULL,

//     FOREIGN KEY (parentSubsystemName) REFERENCES Subsystems(Name),
//     FOREIGN KEY (childProjectID) REFERENCES ProjectTable(ProjectID)
// );
`

// `
// CREATE TABLE SystemChildren
// (
//     parentSystemName VARCHAR(64) NOT NULL,
//     childSubsystemName VARCHAR(64) UNIQUE NOT NULL,

//     FOREIGN KEY (parentSystemName) REFERENCES Systems(Name),
//     FOREIGN KEY (childSubsystemName) REFERENCES Subsystems(Name)
// );
// `

// `
// CREATE TABLE Systems
// (
//     Name VARCHAR(64),
//     Description VARCHAR(512),

//     PRIMARY KEY (Name)
// );
// `

// `
// CREATE TABLE Subsystems
// (
//     Name VARCHAR(64),
//     Description VARCHAR(512),

//     PRIMARY KEY (Name)
// );
// `

// `CREATE TABLE ProjectChildren
// (
//     parentProjectID INT NOT NULL, 
//     childTaskID INT NOT NULL UNIQUE,

//     FOREIGN KEY (parentProjectID) REFERENCES ProjectTable(ProjectID),
//     FOREIGN KEY (childTaskID) REFERENCES TaskTable(TaskID)
// );
// `

// `CREATE TABLE ProjectTable
// (
//     ProjectID INT,

//     Title VARCHAR(64),
//     Description VARCHAR(512),

//     StartDate DATE,
//     NumDays INT,

//     PRIMARY KEY (ProjectID),
//     FOREIGN KEY (ProjectID) REFERENCES DataTable(ID),

//     CHECK (NumDays >= 0)
// );
// `

// `CREATE TABLE TaskTable
// (
//     TaskID INT,

//     Title VARCHAR(64),
//     Description VARCHAR(512),

//     StartDate DATE,
//     NumDays INT,

//     PercentCompleted INT NOT NULL,

//     Assignee VARCHAR(64),

//     CHECK (NumDays >= 0),
//     CHECK (PercentCompleted >= 0 AND PercentCompleted <= 100),

//     PRIMARY KEY (TaskID),
//     FOREIGN KEY (TaskID) REFERENCES DataTable(ID)
// );
// `


// `CREATE TABLE DataTable
// (
//     ID INT,
//     IssueType VARCHAR(32),

//     PRIMARY KEY(ID)
// );
// `;


let sql = table;

conn.query(sql, function (err, result) {
if (err) throw err;
console.log("Table Created", result);
});

conn.end();