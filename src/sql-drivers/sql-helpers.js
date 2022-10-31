// Helper functions for SQL operations.

const { createConn } = require('./sql-connection');
const { sqlKeywords } = require('../globals/globals');

// Search each query for each keyword and warn when applicable
//? Return true when keyword is detected, false if undetected
var detectSqlKeywords = async function(query){
    if(query !== null)
    {
        sqlKeywords.forEach(keyword => {
            // If the query contains the sqlkeyword
            if((query.toUpperCase()).includes(keyword))
            {
                console.warn(`${query} contains ${keyword}`);
                return true;
            }
        });
    }
    return false;
}

// Take a comma delimited params list and stick it into the database
var addToDatabase = async function(params){
    let tableName = 'datatable'; //TODO tablename

    let sql = `INSERT INTO ${tableName} VALUES (${params})`;

    let res = await queryDatabase();

    return;
}

// Query the PMSys database with some given sql query
var queryDatabase = async function(sql){
    let conn = createConn();

    var queryPromise = new Promise((resolve, reject) => {
        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
    
            resolve(result);
        });
    });

    const newVal = queryPromise.then(async (val) =>
    {
        conn.end();

        console.log(val);
        return val;
    });   

    return await newVal;
}

// Query the PMSys database for the highest ID
var queryHighestID = async function(){
    let tableName = 'datatable';     //TODO tablename

    let sql = `
        SELECT MAX(ID)
        FROM ${tableName}
    `;

    let res = await queryDatabase(sql);

    return res.ID;
}

// Converts the result of a sql query into text
// res should be in the form of an array of RowDataPackets
var resToText = function(res){
    let ret = '';
    res.forEach(RDP => {
        ret += `${RDPToText(RDP)}`;
    });

    return ret;
}

// Converts a single RowDataPacket into readable text and returns the formatted text
var RDPToText = function(RowDataPacket){
    let ret = '';
    Object.entries(RowDataPacket).forEach(entry => {
        const [key, value] = entry;
        ret += `${key}:${value} `
    })
    ret += '\n';

    return ret;
}

module.exports = {
    detectSqlKeywords: detectSqlKeywords,
    addToDatabase: addToDatabase,
    queryHighestID: queryHighestID,
    queryDatabase: queryDatabase,

    resToText: resToText,
    RDPToText: RDPToText
};