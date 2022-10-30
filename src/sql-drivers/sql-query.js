// Query Syntax
// -----
/*
*SYNTAX*:

? Query Syntax is in a condition:value format.

SELECT *
FROM issueList

*WHERE*
system/subsystem:{string} //? Only supports : //! This is the only one critical for midterm demo
priority:{trivial,minor,major,critical} //? Will also support >, < etc //! Make this an ENUM type
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

! SAMPLE QUERIES FOR MIDTERM DEMO
`    `                                  //? Empty query to show entire database (SELECT * FROM table)

` system='SSL' AND subsystem='Avionics' ` //? Shows nothing happens when system/subsys don't match

`system='ISL' AND subsystem='Avionics'`       //? Show that a query for system AND subsystem returns the same
and                                     //? Thing when they are both valid. (Avionics & ISL->Avionics are same)
`subsystem='Avionics'`   

`system='ISL'`                          //? Print out all the content in a system

*/
// 

var { detectSqlKeywords, queryDatabase } = require('./sql-helpers');

// Takes text from an input box and parses into separate queries
// Separates by space (or empty space in the case of beginning/end)
function parseQueryInput(rawText){
    // compresses multiple spaces to one space each
    rawText = rawText.replace(/  +/g, ' ');
    rawText = rawText.trim();

    rawText = parseQuery(rawText);

    // check for individual queries where there is one space before & after
    // store those values in an array
    //? If we want to change the delim option, do it here & above
    let queries = rawText.split(' ');

    //check size of queries array to make sure we aren't wasting time
    //doing future operations just for it to be empty

    // Warn on keyword detection
    queries.forEach(query => {
        let val = detectSqlKeywords(query);
    });

    // Run (safe?) sql queries
    constructSqlQuery(rawText);

    let res = queryDatabase(sql);
    console.log(res);

    //do element creation stuff with res
    
}

// Construct a valid sql query from a list of queries
function constructSqlQuery(rawQuery){
    // SELECT the everything needed to generate html content
    let SELECT_CLAUSE = '*'

    // FROM table
    let FROM_CLAUSE = 'tableName'   //TODO tablename

    // WHERE replace all spaces with AND clauses
    let WHERE_CLAUSE = rawQuery.replace(/ /g, ' AND ');

    // in the future there can be sort by's added to this query via
    // having dropdowns involved in the submission. for now, sorting
    // will be in whichever way it comes out.
    let sql = `
    ${SELECT_CLAUSE}
    ${FROM_CLAUSE}
    ${WHERE_CLAUSE}
    `
    console.log(sql);

    return sql;
}