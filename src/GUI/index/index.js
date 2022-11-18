
const remote = require('electron').remote;  // For using electron modules remotely (?)
const BrowserWindow = remote.BrowserWindow; // For launching an external window

window.onload = loadDropdownContent;

//* LOAD THE DROPDOWN CONTENT (FOR SYSTEM/SUBSYSTEM) ON LOAD *\\
// ---------------------------------------------------------- \\
function loadDropdownContent(){
    // query the database for all systems and subsystems
    loadSystemContent();
    loadSubsystemContent();



}

function loadSystemContent(condition = "*"){
    let systemDropdown = document.getElementById('sysDrpContent');

    //load the content from the system database
    let content = getTableContent("System", condition);


}

function loadSubsystemContent(condition = "*"){
    let systemDropdown = document.getElementById('subsysDrpContent');

    //load the content from the subsystem database
    let content = getTableContent("Subsystem", condition);

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