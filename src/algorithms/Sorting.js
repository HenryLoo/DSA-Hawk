const Sorting = {

  selectionSort: function (arr) {
    let n = arr.length;
    for (let i = 0; i < n; i++) {
      // Find the minimum value in the array from i...n
      let minIndex = i;
      let minVal = arr[minIndex];
      for (let j = i + 1; j < n; j++) {
        let val = arr[j];
        if (val < minVal) {
          minIndex = j;
          minVal = val;
        }
      }

      // Swap the minimum value's position with the ith element
      let temp = arr[i];
      arr[i] = minVal;
      arr[minIndex] = temp;
    }
  },

}

export default Sorting;
