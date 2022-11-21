// Loads query content into a div.

const { queryDatabase } = require("../sql-drivers/sql-helpers")

// Generate content inside the div using a query result as an argument.
// Result is an array of RowDataPacket objects
var getTableContent = async function(table, condition = "*"){
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

// Populates a dropdown menu element passed in as dropdownElem (ul type)
// 
// Populates using the elems array, which is an array of RowDataPackets
// which can access the string representation using the column name from
// the database (for System/Subsystem, this is the "Name" attribute)
var populateDropdown = function(dropdownElem, elems)
{
    elems.forEach(dataRow => {
        let liElem = document.createElement("li");
        let aElem = document.createElement("a");
        
        aElem.href = "#";
        aElem.innerText = dataRow["Name"];

        liElem.appendChild(aElem);

        // Add an event listener that waits for a click to create a reaction event
        // for querying the database
        liElem.addEventListener('click', function(){
            console.log(`${this.innerText} <- THIS IS ME!`)
        })

        dropdownElem.appendChild(liElem);
    });
}

module.exports = {
    getTableContent: getTableContent,
    populateDropdown: populateDropdown
}