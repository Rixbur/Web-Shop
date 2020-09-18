function cartesianProduct(...allEntries: any[][]): any[][] {
    allEntries = allEntries.filter(entry=>entry.length!=0);
    console.log(allEntries);
    
    return allEntries.reduce<any[][]>(
      (results, entries) =>
        results
          .map(result => entries.map(entry => result.concat([entry])))
          .reduce((subResults, result) => subResults.concat(result), []), // <-------------
      [[]]
    )
}

console.log(cartesianProduct([1,2],[3,4],[""]));