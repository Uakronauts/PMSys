
const remote = require('electron').remote;  // For using electron modules remotely (?)
const BrowserWindow = remote.BrowserWindow; // For launching an external window

//* CONTENT LOADERS
const { populateDropdown } = require("../content-loaders/dropdown-loader");
const { populateIssueTable } = require('../content-loaders/issue-loader');

const { getTableContent } = require("../../sql-drivers/sql-helpers");

window.onload = loadDropdownContent;

//* LOAD THE DROPDOWN CONTENT (FOR SYSTEM/SUBSYSTEM) ON LOAD *\\
// ---------------------------------------------------------- \\
//#region DROPDOWNCONTENT
function loadDropdownContent(){
    // query the database for all systems and subsystems
    loadSystemContent();
    loadSubsystemContent();
}

async function loadSystemContent(){
    let systemDropdown = document.getElementById('sysDrpContent');
    // clear all existing content in the element
    systemDropdown.innerHTML = '';

    //load the content from the system database
    let content = await getTableContent("SystemsTable");

    // convert the array into <li> elements and place within the dropdown
    populateDropdown(systemDropdown, content);
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
    populateDropdown(subsystemDropdown, content, "ParentSys");
}
//#endregion

// ---------------------------------------------------------- \\



//* OPEN A NEW PAGE WHEN THE ADD BUTTON IS CLICKED *\\
// ------------------------------------------------- \\
// #region ADDPAGE
let addButton = document.getElementById('addIssue');
addButton.addEventListener('click', function(){
    launchNewPage();
});

function launchNewPage(){
    let newWindowHTML = `${process.cwd()}/src/GUI/newMenu/newMenu.html`;
    let newWindowICON = `${process.cwd()}/resources/icons/newIssue.ico`;

    // Set up and launch Secondary Window (s e p a r a t e l y) (we love social distancing)
    const NewWindow = new BrowserWindow({
            width: 1200,
            height: 700,
            webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        },
        icon: newWindowICON,
        autoHideMenuBar: true,
        title: "Add a new issue."
    })

    NewWindow.loadFile(newWindowHTML);
}
// #endregion
// ------------------------------------------------- \\

