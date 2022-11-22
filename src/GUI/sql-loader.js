// Loads query content into a div.

const { queryDatabase } = require("../sql-drivers/sql-helpers");
const { loadSubsystemContent } = require("./index");

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

// Populates a dropdown menu element passed in as dropdownElem (ul type)
// 
// Populates using the elems array, which is an array of RowDataPackets
// which can access the string representation using the column name from
// the database (for System/Subsystem, this is the "Name" attribute)
//
// spacerAttribute specifies an attribute to check in the elems array, and detect
// a change in order to create a spacer
var populateDropdown = function(dropdownElem, elems, spacerAttribute = undefined)
{
    let currData = elems[0];
    let lastEntry = undefined;

    // prevents a bad spacer attrbute to check from being passed
    if(spacerAttribute !== undefined && elems[0][spacerAttribute] === undefined)
    {
        console.warn(`Bad spacer attribute '${spacerAttribute}' passed.`);
        spacerAttribute = undefined;
    }

    elems.forEach(dataRow => {
        let liElem = document.createElement("li");
        let aElem = document.createElement("a");

        lastEntry = currData;
        currData = dataRow;

        // if we want to create an attribute to space on
        if(spacerAttribute !== undefined)
        {
            if(currData[spacerAttribute] !== lastEntry[spacerAttribute])
            {
                let spacerElem = document.createElement("li");
                spacerElem.classList.add("divider");
                dropdownElem.appendChild(spacerElem);
            }
        }
        
        aElem.href = "#";
        aElem.innerText = currData["Name"];

        liElem.appendChild(aElem);

        if(dataRow["ParentSys"] === undefined)
        {
            // Add an event listener that waits for a click to create a reaction event
            // for querying the database. This is for SYSTEMS table (should not modify)
            // subsystems dropdown, but should still add.modify a query element
            liElem.addEventListener('click', async function(){
                console.log(`${this.innerText} <- THIS SYSTEM IS ME!`);

                // get the system query & set it to the appropriate value
                document.getElementById("systemQuery");
                systemQuery.innerText = `SystemsTable = '${this.innerText}'`;
                createQueryClose(systemQuery);
                
                unhideElement(systemQuery);

                unhideQueryDisplay();

                // TODO: system needs to check currently selected subsystem (if there is one) to make sure it is within
                // TODO: the correct system (if not, needs to be cleared)

                reloadSubsystemDropdown(this.innerText);
            })
        }
        else //ParentSys is undefined (subsystem)
        {
            // Add an event listener that waits for a click to create a reaction event
            // for querying the database. This is for SUBSYSTEMS table, which should
            // auto select the appropriate parent system from the systems dropdown by
            // finding and "clicking" the appropriate li element
            liElem.addEventListener('click', function(){
                console.log(`${this.innerText} <- THIS SUBSYSTEM IS ME!`);

                // get the subsystem query & set it to the appropriate value
                document.getElementById("subsystemQuery");
                subsystemQuery.innerText = `SubsystemsTable = '${this.innerText}'`;
                createQueryClose(subsystemQuery);

                unhideElement(subsystemQuery);

                unhideQueryDisplay();

            })
        }


        dropdownElem.appendChild(liElem);
    });
}

function createQueryClose(elem)
{
    let closeSpan = document.createElement('span');
    closeSpan.classList.add("queryClose");
    closeSpan.innerText = '⨯';

    closeSpan.addEventListener("click", function() {
        //TODO remove the selected query portion from the total query (this will automatically cause the database to redisplay)
    
    
        // set the display to none
        this.parentElement.classList.add('hidden');

        // if the parent element is the system query, need to unlock all the rest of the subsystems
        // ie. reload the dropdown with nothing selected
        if(this.parentElement.id === "systemQuery")
        {
            reloadSubsystemDropdown();
        }
    
        // check if ANY queries are being displayed (if not, hide the query pane)
        let numHidden = 0;
    
        let closebtns = document.getElementsByClassName("queryClose");
    
        for (i = 0; i < closebtns.length; i++){
            if(closebtns[i].parentElement.classList.contains('hidden'))
            {
                numHidden++;
            }
        };
        console.log(numHidden);
        if(numHidden === closebtns.length){
            document.getElementById("queryDisplay").classList.add("hidden");
        }        
    
      });

    elem.appendChild(closeSpan);
}

function unhideElement(elem)
{
    if(elem.classList.contains("hidden")){
        elem.classList.remove("hidden");
    }

    return;
}

function unhideQueryDisplay()
{
    unhideElement(document.getElementById("queryDisplay"));
}

async function reloadSubsystemDropdown(parentSys = "*")
{
    //system needs to adjust subsystem when chosen.
    let subsystemDropdown = document.getElementById('subsysDrpContent');
    // clear all existing content in the element
    subsystemDropdown.innerHTML = '';
    
    let query = parentSys;
    if(query !== "*")
    {
        query = `SubsystemsTable.ParentSys = '${parentSys}'`;
    }

    let content = await getTableContent("SubsystemsTable", query, "ParentSys DESC");

    populateDropdown(subsystemDropdown, content, "ParentSys");
}

module.exports = {
    getTableContent: getTableContent,
    populateDropdown: populateDropdown
}