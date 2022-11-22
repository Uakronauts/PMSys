


// GLOBAL QUERY OBJECT
var GLOBAL_QUERY = {
    queryInternal: "",
    queryListener: function(val) {},
    set query(val) {
        this.queryInternal = val;
        this.queryListener(val);
    },
    get query() {
        return this.queryInternal;
    },
    registerListener: function(listener) {
        this.queryListener = listener;
    }
}

// FUNCTION THAT FIRES EACH TIME GLOBAL_QUERY.query is changed (re-run the sql parser with the
// new query)
GLOBAL_QUERY.registerListener(function(val) {
    console.log("Someone changed the value of GLOBAL_QUERY to " + val);
});

module.exports = {
    GLOBAL_QUERY: GLOBAL_QUERY
}