const { queryDatabase } = require("../../sql-drivers/sql-helpers");
const { GLOBAL_QUERY } = require("../global-query");

var registerAttributeListeners = function()
{
    GLOBAL_QUERY.registerSubsystemListener(function(val){
        console.log(`Subsystem query changed! ${val}`);

        populateIssueTable();
    });
}

// load the issue content into a container (div) element
// by parsing the data array of RowDataPackets from the database
var populateIssueTable = async function(){
    let data = await GLOBAL_QUERY.queryDatatable();

    // if no errors occur on verifying data, continue
    if(await verifyQueryData(data)){
        showTable();

        


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
        mainQueryFeedback.innerText = "☠️ Some unknown error occurred."
        feedbackHint.innerText = feedbackCode;
    }

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

module.exports = {
    populateIssueTable: populateIssueTable,
    registerAttributeListeners: registerAttributeListeners
}