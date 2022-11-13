const { queryDatabase } = require("../../sql-drivers/sql-helpers");
const { generateContent } = require("./../sql-loader");

generateContent();

/*
CREATE TABLE DataTable
(
    id INT,
    
    title VARCHAR(64),
    description VARCHAR(512),
    
    syslab VARCHAR(16),
    subsystem VARCHAR(16),

    startdate DATE,
    numdays INT, CHECK(numdays > 0),


    PRIMARY KEY(id)
);
*/

function addToDB(e) {
    e.preventDefault();

    var projID = window.document.myform.projID.value;
    var projName = window.document.myform.docname.value;
    var projDesc = window.document.myform.projDesc.value;
    var sysLab = window.document.myform.syslab.value;
    var subsys = window.document.myform.subsys.value;
    var sDate =  window.document.myform.sDate.value;
    var numDays =  window.document.myform.numDays.value;

    let dataStr = `${projID},'${projName}','${projDesc}','${sysLab}','${subsys}','${sDate}',${numDays}`; 
    let tempStr = 'id,title,description,syslab,subsystem,startdate,numdays';

    let sql = `INSERT INTO DataTable(${tempStr})
               VALUES (${dataStr});`;

    console.log(sql);

    queryDatabase(sql);
    
    // var pom = document.createElement('a');
    // pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + 
    //   "Start Date: " + encodeURIComponent(sDate) + "\n\n" +
    //   "Number of Days: " + encodeURIComponent(numDays) + "\n\n" +
    //   "Project Name: " + encodeURIComponent(projName) + "\n\n" +
    //   encodeURIComponent(text)); 
  
    // pom.setAttribute('download', filename);
  
    // pom.style.display = 'none';
    // document.body.appendChild(pom);
  
    // pom.click();
  
    // document.body.removeChild(pom);
  }