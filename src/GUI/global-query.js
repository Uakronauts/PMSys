// GLOBAL QUERY OBJECT
// ---
// Contains methods for manipulating the global query
// and displaying certain attributes on the HTML table.

const { queryDatabase } = require("../sql-drivers/sql-helpers");

var GLOBAL_QUERY = {
    // Full Query Functions
    _lastFullQuery: "", //* internal variable to represet the last executed full query
    get fullQuery() {
        let _fullQuery = "";

        // If all the queries are blank, do not return anything (should not be able to query the entire)
        // database at once...
        if(!(this._systemQuery === "" && this._subsystemQuery === "" && this._otherQuery === ""))
        {
            _fullQuery = `
            SELECT *
            FROM DataTable
            WHERE ${constructWhereClause("", this._subsystemQuery, this._otherQuery)}
            `;
        }
        

        return _fullQuery;
    },

    // System Query Variables
    _systemQuery: "",   //* Internal variable
    set systemQuery(val) {
        this._systemQuery = val;
        this._systemListener(val);
    },
    get systemQuery() {
        return this._systemQuery;
    },
    _systemListener: function(val) {},
    registerSystemListener: function(listener){
        this._systemListener = listener;
    },

    // Subsystem Query Variables
    _subsystemQuery: "",    //* Internal variable
    set subsystemQuery(val) {
        this._subsystemQuery = val;
        this._subsystemListener(val);
    },
    get subsystemQuery() {
        return this._subsystemQuery;
    },
    _subsystemListener: function(val) {},
    registerSubsystemListener: function(listener){
        this._subsystemListener = listener;
    },

    // Other Query Variables
    _otherQuery: "",      //* Internal variable
    set otherQuery(val) {
        this._otherQuery = val;
        this._otherListener(val);
    },
    get otherQuery() {
        return this._otherQuery;
    },
    _otherListener: function(val) {},
    registerOtherListener: function(listener){
        this._otherListener = listener;
    },

    // Last existing data variable
    _lastData: null,    //* Internal variable
    get lastData() {
        return this._lastData;
    },

    setAttribute: function(queryElem, queryText){

        if(queryElem === "systemQuery")
        {
            GLOBAL_QUERY.systemQuery = queryText;
        }
        else if(queryElem === "subsystemQuery")
        {
            GLOBAL_QUERY.subsystemQuery = queryText;
        }
        else if(queryElem === "otherQuery")
        {
            GLOBAL_QUERY.otherQuery = queryText;
        }
    },

    clearAttribute: function(queryElem){
        this.setAttribute(queryElem, "");
    },

    queryDatatable: async function(){
        if(this.fullQuery === "")
        {
            return undefined;
        }
        else
        {
            let lastData = await queryDatabase(this.fullQuery);
            this._lastFullQuery = this.fullQuery;
    
            return lastData;
        }
    }
}


function constructWhereClause(sysQ, ssQ, othQ)
{
    if(sysQ !== "")
    {
        if(ssQ !== "")
        {
            if(othQ !== "")
            {
                return `${sysQ} AND ${ssQ} AND ${othQ}`;
            }
            else
            {
                return `${sysQ} AND ${ssQ}`;
            }
        }
        else
        {
            if(othQ !== "")
            {
                return `${sysQ} AND ${othQ}`;
            }
            else
            {
                return `${sysQ}`;
            }
        }
    }
    else
    {
        if(ssQ !== "")
        {
            if(othQ !== "")
            {
                return `${ssQ} AND ${othQ}`;
            }
            else
            {
                return `${ssQ}`;
            }
        }
        else
        {
            if(othQ !== "")
            {
                return `${othQ}`;
            }
            else
            {
                return "";
            }
        }
    }
}

module.exports = {
    GLOBAL_QUERY: GLOBAL_QUERY
}