const Sorting = {

  selectionSort: function (arr) {
    let n = arr.length;
    for (let i = 0; i < n; i++) {
      let iVal = arr[i];

      // Find the minimum value in the array from i...n
      let minIndex = i;
      let minVal = iVal;
      for (let j = i + 1; j < n; j++) {
        let val = arr[j];
        if (val < minVal) {
          minIndex = j;
          minVal = val;
        }
      }

      // Swap the minimum value's position with the ith element
      arr[i] = minVal;
      arr[minIndex] = iVal;
    }
  },

}

export default Sorting;
