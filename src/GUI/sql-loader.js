// Loads query content into a div.

const { queryDatabase } = require("../sql-drivers/sql-helpers")

// Generate content inside the div using a query result as an argument.
// Result is an array of RowDataPacket objects
async function getTableContent(table, condition = "*"){
    //create a connection & query a database
    let sql = '';
    if(condition === '*')
    {
        sql = 
        `
        SELECT Name
        FROM ${table}
        `
    }
    else
    {
        sql = 
        `
        SELECT Name
        FROM ${table}
        WHERE ${condition}
        `
    }

    let data = await queryDatabase(sql);
    return data;
}

module.exports = {
    getTableContent: getTableContent
}