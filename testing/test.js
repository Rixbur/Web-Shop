function cartesianProduct() {
    var allEntries = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        allEntries[_i] = arguments[_i];
    }
    allEntries = allEntries.filter(function (entry) { return entry.length != 0; });
    console.log(allEntries);
    return allEntries.reduce(function (results, entries) {
        return results
            .map(function (result) { return entries.map(function (entry) { return result.concat([entry]); }); })
            .reduce(function (subResults, result) { return subResults.concat(result); }, []);
    }, // <-------------
    [[]]);
}
console.log(cartesianProduct([1, 2], [3, 4], [""]));
