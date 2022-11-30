// Helper functions for SQL operations.

const { createConn } = require('./sql-connection');
const { sqlKeywords } = require('../globals/globals');

// Search each query for each keyword and warn when applicable
//? Return true when keyword is detected, false if undetected
var detectSqlKeywords = async function(query, func){
    if(query !== null)
    {
        sqlKeywords.forEach(keyword => {
            // If the query contains the sqlkeyword
            if((query.toUpperCase()).includes(keyword))
            {
                func(query, keyword);
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
            if (err) return resolve(err);
    
            resolve(result);
        });
    });

    const newVal = queryPromise.then(async (val) =>
    {
        conn.end();

        return val;
    });   

    return await newVal;
}

// Query the PMSys database for the highest ID
var queryHighestID = async function(){
    let tableName = 'DataTable';     //TODO tablename

    let sql = `
        SELECT MAX(ID)
        FROM ${tableName}
    `;

    let res = await queryDatabase(sql);

    return res;
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

// Generate content inside the div using a query result as an argument.
// Result is an array of RowDataPacket objects
var getTableContent = async function(table, condition = "*", ordering = "*"){
    // create a connection & query a database
    // needs to select all for System and Subsystem tables because
    // we need to see if the content has a ParentSys attribute
    let sql = '';
    if(condition === '*')
    {
        if(ordering === '*')
        {
            sql = 
            `
            SELECT *
            FROM ${table}
            `;
        }
        else
        {
            sql = 
            `
            SELECT *
            FROM ${table}
            ORDER BY ${ordering}
            `;
        }
        
    }
    else
    {
        if(ordering === '*')
        {
            sql = 
            `
            SELECT *
            FROM ${table}
            WHERE ${condition}
            `
        }
        else
        {
            sql = 
            `
            SELECT *
            FROM ${table}
            WHERE ${condition}
            ORDER BY ${ordering}
            `
        }
    }

    let data = await queryDatabase(sql);
    return data;
}

module.exports = {
    detectSqlKeywords: detectSqlKeywords,
    addToDatabase: addToDatabase,
    queryHighestID: queryHighestID,
    queryDatabase: queryDatabase,
    getTableContent: getTableContent,

    resToText: resToText,
    RDPToText: RDPToText
};