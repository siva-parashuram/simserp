/**
 * @name Sort
 * @description will Sort the data based on params supplied
 * @param {object} variables
 * @param {string} param
 */

export const sortFunction = (arr, target) =>
  arr.length > 0
    ? arr.sort((a, b) => {
        if (typeof a[target] == "string") {
          // console.log("The Target", a[target]);
          return (
            parseInt(a[target]) - parseInt(b[target]) ||
            //a[target].length - b[target].length ||
            a[target].localeCompare(b[target])
          );
        } else {
          // console.log("The Target", a[target], " Not A string");
          return parseInt(a[target]) - parseInt(b[target]);
        }
      })
    : arr;

export const sortDescFunction = (arr, target) =>
  arr.length > 0
    ? arr.sort((a, b) => {
        if (typeof a[target] == "string") {
          // console.log("The Target", a[target]);
          return (
            parseInt(b[target]) - parseInt(a[target]) ||
            //a[target].length - b[target].length ||
            b[target].localeCompare(a[target])
          );
        } else {
          // console.log("The Target", a[target], " Not A string");
          return parseInt(b[target]) - parseInt(a[target]);
        }
      })
    : arr;
