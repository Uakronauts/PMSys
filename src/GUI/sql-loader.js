// Loads query content into a div.

var { resToText } = require('../sql-drivers/sql-helpers');
var { parseQueryInput } = require("../sql-drivers/sql-query");


// Generate content inside the div using a query result as an argument.
// Result should be an array of RowDataPacket objects
var generateContent = async function(query = ""){
    var contentDiv = document.getElementById('sql-content');
    var res = await parseQueryInput(query);

    clearContent(contentDiv);

    if(res !== null && res !== undefined){
        
        let arr = resToText(res).split("\n");
        //console.log(arr);

        for(let i = 0; i < arr.length; ++i)
        {
            let textElem = Object.assign(
                document.createElement(`h3`), {
                    innerHTML: arr[i],
                    id: `result${i}`
            });
            contentDiv.appendChild(textElem);
        }
    }
    else{
        p.innerHTML = "The query returned empty or an error occurred.";
        contentDiv.append(p);
    }
    
    return;
}

// Clear the content from the content div. This prevents duplicate entries from being added.
var clearContent = function(divElem){
    divElem.innerHTML = "";
}

module.exports = {
    generateContent: generateContent
}