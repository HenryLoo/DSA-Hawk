const Sorting = {

  selectionSort: function (arr) {
    let n = arr.length;
    for (let i = 0; i < n; i++) {
      let iVal = arr[i];
      let minIndex = i;
      let minVal = iVal;

      for (let j = i + 1; j < n; j++) {
        let val = arr[j];
        if (val < minVal) {
          minIndex = j;
          minVal = val;
        }
      }

      arr[i] = minVal;
      arr[minIndex] = iVal;
    }
  },

}

export default Sorting;
