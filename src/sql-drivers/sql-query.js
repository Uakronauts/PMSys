// Query Syntax
// -----
/*
*SYNTAX*:

? Query Syntax is in a condition:value format.
? Queries will always SELECT the issueID

*WHERE*
system/subsystem:{string} //? Only supports : //! This is the only one critical for midterm demo
priority:{trivial,minor,major,critical} //? Will also support >, < etc
type:{issue,improvement} //? Only supports :
author:{string} //? Supports all equiv operators
assignee:{string} //? Supports all equiv operators
includes:{string} //? Only supports :
is:{open/closed} //? Only supports :
id:{num} //? Supports all equiv operators

*ORDER BY*
datetime (asc/desc)
author (alpha/rev alpha)
priority (high to low/low to high)

!SQL KEYWORDS ARE SENSITIVE!

*/
// 

const { sqlKeywords } = require('../globals/globals');

// Takes text from an input box and parses into separate queries
// Separates by space (or empty space in the case of beginning/end)
function parseQueryInput(rawText){
    // compresses multiple spaces to one space each
    rawText.replace(/  +/g, ' ');

    // check for individual queries where there is one space before & after
    // store those values in an array
    //? If we want to change the delim option, do it here & above
    let queries = rawText.split(' ');

    // Warn on keyword detection
    queries.forEach(query => {
        let val = detectSqlKeywords(query);
    });

    // Run (safe?) sql queries
    constructSqlQuery(queries);
}

// Search each query for each keyword and warn when applicable
//? Return true when keyword is detected, false if undetected
function detectSqlKeywords(query){
    sqlKeywords.forEach(keyword => {
        // If the query contains the sqlkeyword
        if(query.toUpperCase().contains(keyword))
        {
            console.warn(`${query} contains ${keyword}`);
            return true;
        }
    });
    return false;
}

// Construct a valid sql query from a list of queries
function constructSqlQuery(queries){
    // SELECT the issueID

    // FROM table

    // WHERE (foreach queries->query, query AND query AND ...)
    let WHERE_CLAUSE = "";
    queries.forEach(query => {
        WHERE_CLAUSE = `${WHERE_CLAUSE} ${parseQuery(query)} AND`;
    });
    //remove last AND
    WHERE_CLAUSE = WHERE_CLAUSE.substring(0, WHERE_CLAUSE.length - 4);
}

function parseQuery(query){
    // : -> =
    let temp = query.replace(':'/g,'=');
}