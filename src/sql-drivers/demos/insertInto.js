var { createConn } = require('../sql-connection');

let conn = createConn();

/*
    id INT,
    
    title VARCHAR(64),
    description VARCHAR(512),
    
    syslab VARCHAR(16),
    subsystem VARCHAR(16),

    startdate DATE,
    numdays INT, CHECK(numdays > 0),


    PRIMARY KEY(id)
*/

let sql = `
INSERT INTO DataTable(id, title, description, syslab, subsystem, startdate, numdays)
VALUES (6, 'Make big explosions', 'BOOM', 'PSL', 'Liquid Engine', '2022-01-01', 365)
`

conn.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log("Value Created", result);
  });

 conn.end();