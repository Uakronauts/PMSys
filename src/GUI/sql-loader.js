// Loads query content into a div.

const { queryDatabase } = require("../sql-drivers/sql-helpers")

// Generate content inside the div using a query result as an argument.
// Result is an array of RowDataPacket objects
var getTableContent = async function(table, condition = "*"){
    // create a connection & query a database
    // needs to select all for System and Subsystem tables because
    // we need to see if the content has a ParentSys attribute
    let sql = '';
    if(condition === '*')
    {
        sql = 
        `
        SELECT *
        FROM ${table}
        `
    }
    else
    {
        sql = 
        `
        SELECT *
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

        if(dataRow["ParentSys"] === undefined)
        {
            // Add an event listener that waits for a click to create a reaction event
            // for querying the database. This is for SYSTEMS table (should not modify)
            // subsystems dropdown, but should still add.modify a query element
            liElem.addEventListener('click', function(){
                console.log(`${this.innerText} <- THIS SYSTEM IS ME!`)
            })
        }
        else //ParentSys is undefined (subsystem)
        {
            // Add an event listener that waits for a click to create a reaction event
            // for querying the database. This is for SUBSYSTEMS table, which should
            // auto select the appropriate parent system from the systems dropdown by
            // finding and "clicking" the appropriate li element
            liElem.addEventListener('click', function(){
                console.log(`${this.innerText} <- THIS SUBSYSTEM IS ME!`)
            })
        }


        dropdownElem.appendChild(liElem);
    });
}

module.exports = {
    getTableContent: getTableContent,
    populateDropdown: populateDropdown
}