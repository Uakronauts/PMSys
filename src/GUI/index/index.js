
const remote = require('electron').remote;  // For using electron modules remotely (?)
const BrowserWindow = remote.BrowserWindow; // For launching an external window

var { GLOBAL_QUERY } = require("../global-query");
const { getTableContent, populateDropdown } = require("../sql-loader");

window.onload = loadDropdownContent;

//* LOAD THE DROPDOWN CONTENT (FOR SYSTEM/SUBSYSTEM) ON LOAD *\\
// ---------------------------------------------------------- \\
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

// ---------------------------------------------------------- \\



//* OPEN A NEW PAGE WHEN THE ADD BUTTON IS CLICKED *\\
// ------------------------------------------------- \\
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

// ------------------------------------------------- \\


function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

const STAR_COUNT = 1000
let result = ""
for(let i = 0; i < STAR_COUNT; i++){
    result += `${randomNumber(-1000, 1000)}vw ${randomNumber(-1000, 1000)}vh ${randomNumber(-1000, 1000)}px ${randomNumber(-1000, 1000)}px #fff,`
}
console.log(result.substring(0, result.length - 1))
