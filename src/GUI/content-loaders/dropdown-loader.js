// Loads query content into a div.

const { getTableContent } = require("../../sql-drivers/sql-helpers");
const { GLOBAL_QUERY } = require("../global-query");


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
                systemQuery.innerText = `System = '${this.innerText}'`;

                GLOBAL_QUERY.setAttribute("systemQuery", systemQuery.innerText);

                createQueryClose(systemQuery);
                
                unhideElement(systemQuery);

                unhideQueryDisplay();

                let ssQuery = document.getElementById("subsystemQuery");
                
                if(ssQuery.innerText !== '')
                {
                    let firstTick = ssQuery.innerText.indexOf(`'`);
                    let lastTick = ssQuery.innerText.indexOf(`'`, firstTick+1);
                    
                    // if subsystem parent is not the same as the new system (remove it)
                    if(!await checkSubsystemParent(ssQuery.innerText.substring(firstTick+1, lastTick), this.innerText))
                    {
                        ssQuery.lastChild.click();
                    }
                }
                
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
                subsystemQuery.innerText = `Subsystem = '${this.innerText}'`;
                
                // add it to the global query
                GLOBAL_QUERY.setAttribute("subsystemQuery", subsystemQuery.innerText);

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
        // remove the selected query portion from the total query (this will automatically cause the database to redisplay)
        GLOBAL_QUERY.clearAttribute(this.parentElement.id);
    
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

        if(numHidden === closebtns.length){
            document.getElementById("queryDisplay").classList.add("hidden");
        }        
    
      });

    elem.appendChild(closeSpan);
}

//* HANDLE AN OTHER QUERY INPUT *\\
// ------------------------------------------------- \\
// #region OTHER INPUT

otherInputBox = document.getElementById('otherQueryInput');
otherInputBox.addEventListener('keyup', function onEvent(e) {
    // If enter key is pressed.
    if (e.keyCode === 13) {
        console.log(otherInputBox.value);

        //check the value for sensitive keywords & show the warning if needed
        
        
        //?depending on the way we want to do this (execute with/without an error)

        //add the text to the global query & create the filter object
        GLOBAL_QUERY.otherQuery = otherInputBox.value;

        let otherQuery = document.getElementById("otherQuery");

        otherQuery.innerText = otherInputBox.value;
        otherInputBox.value = '';

        createQueryClose(otherQuery);

        unhideElement(otherQuery);

        unhideQueryDisplay();
    }

});

// #endregion
// ------------------------------------------------- \\

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

async function checkSubsystemParent(subsystem, sysToCheck)
{
    query = `Name = '${subsystem}'`;
    let content = await getTableContent("SubsystemsTable", query, "ParentSys DESC");

    return content[0]["ParentSys"] === sysToCheck;
}




module.exports = {
    getTableContent: getTableContent,
    populateDropdown: populateDropdown
}