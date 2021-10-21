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
          return (
            parseInt(a[target]) - parseInt(b[target]) ||
            //a[target].length - b[target].length ||
            a[target].localeCompare(b[target])
          );
        } else {
          return parseInt(a[target]) - parseInt(b[target]);
        }
      })
    : arr;

export const sortDescFunction = (arr, target) =>
  arr.length > 0
    ? arr.sort((a, b) => {
        if (typeof a[target] == "string") {
          return (
            parseInt(b[target]) - parseInt(a[target]) ||
            //a[target].length - b[target].length ||
            b[target].localeCompare(a[target])
          );
        } else {
          return parseInt(b[target]) - parseInt(a[target]);
        }
      })
    : arr;
