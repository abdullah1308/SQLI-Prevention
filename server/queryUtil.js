// Compares the dynamic and static sql query after removing parameter values
export function compareQueries(staticQuery, dynamicQuery) {
    var delDynamicQuery = dynamicQuery.replace(/'.*'/, '');
    console.log("DRTQ", delDynamicQuery);

    return delDynamicQuery == staticQuery;
}