const { GLOBAL_QUERY } = require("../global-query");

var registerAttributeListeners = function()
{
    GLOBAL_QUERY.registerSubsystemListener(function(val){
        //console.log(`Subsystem query changed! ${val}`);

        if(val !== "")
        {
            populateIssueTable();
        }
    });
}

// load the issue content into a container (div) element
// by parsing the data array of RowDataPackets from the database
var populateIssueTable = async function(){
    let data = await GLOBAL_QUERY.queryDatatable();

    // if no errors occur on verifying data, continue
    if(await verifyQueryData(data)){
        showTable();

        let display = document.getElementById("mainDisplayTable");
        display.innerHTML = '';

        let funnyColour = getRandomInt(3);
        
        for(let i = 0; i < data.length; ++i)
        {
            RDPtoDisplayRow(data[i], display, 1);
        }
        
        if(display.innerHTML === '')
        {
            hideTable();
            let blanks = [];
            verifyQueryData(blanks);
        }

    }
    else
    {
        hideTable();
    }
}

async function verifyQueryData(data)
{
    // check if the query was empty (global query returned undefined)
    if(data === undefined ){
        displayFeedback(-1);
    }
    // if the query throws an error
    else if(data instanceof Error){
        displayFeedback(data.message);
    }
    // data array is empty (query ran but table was empty... maybe too specific? impossible query)
    else if (data.length === 0){
        displayFeedback(-2);
    }


    // All seems good!
    else{
        hideFeedback();
        return true;
    }

    return false;
}

// Display feedback based on a feedbackCode representing common
// outputs
// ---
// mainQueryFeedback is a larger element containing the main text to be printed.
// feedbackHint is a smaller optional element containing some more detailed text
// on what a user can do to fix the query.
function displayFeedback(feedbackCode)
{
    let mainQueryFeedback = document.getElementById("mainQueryFeedback");
    let feedbackHint = document.getElementById("feedbackHint");

    showFeedback();

    if(feedbackCode === -1)
    {
        mainQueryFeedback.innerText = "☠️ Nothing to display...";
        feedbackHint.innerText = "Maybe add some filters";
    }
    else if(feedbackCode === -2)
    {
        mainQueryFeedback.innerText = "☠️ Nothing to display...";
        feedbackHint.innerText = "Maybe change your filters";
    }
    // Else used as a catch all for string output
    else
    {
        mainQueryFeedback.innerText = "☠️ Some error occurred."
        feedbackHint.innerText = feedbackCode;
    }

}

//accepts a row data packet object, returns a formatted div of the content within that packet.
function RDPtoDisplayRow(RDP, displayDiv, displayInd){
    console.log(RDP);

    let rowDiv = document.createElement("div");
    rowDiv.classList.add('row');
    rowDiv.classList.add('issueWrapper');

    let issueClass = `issueType-${RDP["IssueType"]} ic${displayInd % 3}`;// ic${displayInd % 3}`

    let rowHTML = `
    <div id="iid${RDP["ID"]}" class="col-sm-9 ${issueClass}">
        <h2 class="${issueClass}"><strong>${RDP["Title"]} - [${makeLoadbar(RDP["PercentCompleted"])}]</strong></h2>
        <div class="row">
            <div class="col-sm-2">
                <h6 class="${issueClass}">Start Date: <strong>${RDP["StartDate"].toDateString()}</strong></h6>
            </div>
            <div class="col-sm-2">
                <h6 class="${issueClass}">End Date: <strong>${RDP["EndDate"].toDateString()}</strong></h6>
            </div>
            <div class="col-sm-2">
                <h6 class="${issueClass}"><strong>${RDP["PercentCompleted"]}</strong>% completed</h6>
            </div>
            <div class="col-sm-2">
                <h6 class="${issueClass}">Assignee: <strong>${RDP["Assignee"]}</strong></h6>
            </div>
            <div class="col-sm-4">
                <h6 class="${issueClass}">Desc: ${RDP["Description"]}</strong></h6>
            </div>
        </div>
    </div>
    `;

    rowDiv.innerHTML = rowHTML;

    //find parent project and insert after
    //because of the way this works, projects need loaded first
    if(RDP["IssueType"] === "Task")
    {
        let parent = document.getElementById(`iid${RDP["ParentProj"]}`);
        if(parent !== null)
            parent.insertBefore(rowDiv, null);  //??????
    }
    //jus put it at the end
    else
    {
        displayDiv.appendChild(rowDiv);
    }
}

function makeLoadbar(amt){
    let temp = '';

    let numCmp = amt/10;

    for(let i = 0; i < numCmp; ++i)
    {
        temp = temp + '█';
    }
    for(let i = 0; i < 10-numCmp; ++i)
    {
        temp = temp + '⠀';
    }

    return temp;
}

function hideFeedback(){
    document.getElementById("displayFeedbackWrapper").classList.add("hidden");
}

function showFeedback(){
    document.getElementById("displayFeedbackWrapper").classList.remove("hidden");
}

function hideTable(){
    document.getElementById("mainDisplayTableWrapper").classList.add("hidden");
}

function showTable(){
    document.getElementById("mainDisplayTableWrapper").classList.remove("hidden");
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

module.exports = {
    populateIssueTable: populateIssueTable,
    registerAttributeListeners: registerAttributeListeners
}