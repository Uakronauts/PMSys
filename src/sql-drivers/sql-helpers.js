// Helper functions for SQL operations.

const { createConn } = require('./sql-connection');
const { sqlKeywords } = require('../globals/globals');

// Search each query for each keyword and warn when applicable
//? Return true when keyword is detected, false if undetected
var detectSqlKeywords = function(query){
    sqlKeywords.forEach(keyword => {
        // If the query contains the sqlkeyword
        if(query.toUpperCase().contains(keyword))
        {
            console.warn(`${query} contains ${keyword}`);
            return true;
        }
    });
    return false;
}

// Take a comma delimited params list and stick it into the database
var addToDatabase = function(params){
    let conn = createConn();
    let tableName = '';

    let sql = `INSERT INTO ${tableName} VALUES (${params})`;

    conn.query(sql, function (err, result, fields) {
        if (err) throw err;
        console.log("Values Added: ", result);
    });

    conn.end();
}

var queryHighestID = function(){
    let conn = createConn();
    let tableName = '';
    let highestID = -1;

    let sql = `
        SELECT MAX(ID)
        FROM ${tableName}
    `;

    conn.query(sql, function (err, result, fields) {
        if (err) throw err;

        console.log("Query Results", result);
        highestID = result[0].ID;
    });

    conn.end();

    return highestID;
}

module.exports = {
    detectSqlKeywords: detectSqlKeywords,
    addToDatabase: addToDatabase,
    queryHighestID: queryHighestID
};