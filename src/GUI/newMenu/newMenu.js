
var { GLOBAL_QUERY } = require("../global-query");
const { getTableContent } = require("../content-loaders/dropdown-loader");

window.onload = loadDropdownContent;

//* LOAD THE DROPDOWN CONTENT (FOR SYSTEM/SUBSYSTEM) ON LOAD *\\
// ---------------------------------------------------------- \\
function loadDropdownContent(){
    // query the database for all systems and subsystems
    loadSystemContent();
    loadSubsystemContent();

    document.getElementById("submit").addEventListener('click', async function(){

        let tempData = await queryHighestID();

        let highestID = tempData[0]["MAX(ID)"];

        let addQuery = `INSERT INTO 
        DataTable (EndDate, StartDate, Name, Description, Subsystem, PercentCompleted, IssueType, ID)
        
        VALUES ('${document.getElementById("endDate").value}','${document.getElementById("startDate").value}',
        '${document.getElementById("name").value}', '${document.getElementById("description").value}',
        '${document.getElementById("subsysDrp").innerText}', 0, 'Project', ${highestID})
        ;`

        console.log(addQuery);
    
        //run the query & see if it succeeded

        //if not an instance of error, close the window

        //otherwise display the error & don't close so peeps can fix it


        //window.close();
    });
}

var poopulateDropdown = function(dropdownElem, elems, spacerAttribute = undefined)
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
            liElem.addEventListener('click', function(){
                let elemGuy = document.getElementById("systemDrp");
                elemGuy.innerHTML = `<strong>${this.innerText}</strong>`;
            })
        }
        else //ParentSys is undefined (subsystem)
        {
            // Add an event listener that waits for a click to create a reaction event
            // for querying the database. This is for SUBSYSTEMS table, which should
            // auto select the appropriate parent system from the systems dropdown by
            // finding and "clicking" the appropriate li element
            liElem.addEventListener('click', function(){
                let elemGuy = document.getElementById("subsysDrp");
                elemGuy.innerHTML = `<strong>${this.innerText}</strong>`;

            })
        }


        dropdownElem.appendChild(liElem);
    });
}


async function loadSystemContent(){
    let systemDropdown = document.getElementById('sysDrpContent');
    // clear all existing content in the element
    systemDropdown.innerHTML = '';

    //load the content from the system database
    let content = await getTableContent("SystemsTable");

    // convert the array into <li> elements and place within the dropdown
    poopulateDropdown(systemDropdown, content);
}

async function loadSubsystemContent(parentSys = "*"){
    let subsystemDropdown = document.getElementById('subsysDrpContent');

    //?condition should be like:
    // condition = 'ISL'; or condition = 'PSL'
    // which would return all systems under ISL/PSL umbrella respectively
    let query = parentSys;
    if(query !== "*")
    {
        query = `SubsystemsTable.ParentSys = '${parentSys}'`
    }

    // load the content from the subsystem database
    let content = await getTableContent("SubsystemsTable", query, "ParentSys DESC");

    // convert the array into <li> elements and place within the dropdown
    poopulateDropdown(subsystemDropdown, content, "ParentSys");
}

// ---------------------------------------------------------- \\





const { exists } = require("original-fs");
const { queryHighestID } = require("../../sql-drivers/sql-helpers");

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

const STAR_COUNT = 1000
let result = ""
for(let i = 0; i < STAR_COUNT; i++){
    result += `${randomNumber(-1000, 1000)}vw ${randomNumber(-1000, 1000)}vh ${randomNumber(-1000, 1000)}px ${randomNumber(-1000, 1000)}px #fff,`
}
console.log(result.substring(0, result.length - 1))




function dateCheck(){
    let startDate = new Date($("#hero_startdate").val());
    let endDate = new Date($("#hero_enddate").val());

    if(startDate > endDate) {
        alert("End date need to be bigger then start date");
    }
}

$( document ).ready(function() {
    console.log( "ready!" );
    
    $("#hero_enddate").next().on("dp.change", function(ev) { 
        console.log("Dp change",ev);
        dateCheck(); 
    });
});