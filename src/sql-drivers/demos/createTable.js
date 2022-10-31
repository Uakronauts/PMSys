var { createConn } = require('../sql-connection');

let conn = createConn();

/*
id
system
subsystem
name
description
startdate
numdays
*/

var PMSysBeta = `
CREATE TABLE DataTable
(
    id INT,
    
    title VARCHAR(64),
    description VARCHAR(512),
    
    syslab VARCHAR(16),
    subsystem VARCHAR(16),

    startdate DATE,
    numdays INT, CHECK(numdays > 0),


    PRIMARY KEY(id)
);
`;

// var taskTable = `
// CREATE TABLE testTable
// (
//     name VARCHAR(255) PRIMARY KEY,
//     id INT
// );
// `;

// var projectTable = `
// CREATE TABLE testTable
// (
//     name VARCHAR(255) PRIMARY KEY,
//     id INT
// );
// `;

// var dataTable = `
// CREATE TABLE testTable
// (
//     name VARCHAR(255) PRIMARY KEY,
//     id INT
// );
// `;

// var subsystemTable = `
// CREATE TABLE testTable
// (
//     name VARCHAR(255) PRIMARY KEY,
//     id INT
// );
// `;

// var systemTable = `
// CREATE TABLE testTable
// (
//     name VARCHAR(255) PRIMARY KEY,
//     id INT
// );
// `;

let sql = PMSysBeta;

conn.query(sql, function (err, result) {
if (err) throw err;
console.log("Table Created", result);
});

conn.end();