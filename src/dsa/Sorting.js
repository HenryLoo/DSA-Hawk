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

  quickSort: function(arr) {
    function partition(arr, left, right) {
      let pivot = arr[Math.floor((right + left) / 2)];
      let i = left;
      let j = right;

      while (i <= j) {
        let iVal = arr[i];
        while (iVal < pivot) {
          iVal = arr[++i];
        }

        let jVal = arr[j];
        while (jVal > pivot) {
          jVal = arr[--j];
        }

        if (i <= j) {
          arr[i] = jVal;
          arr[j] = iVal;

          i++;
          j--;
        }
      }

      return i;
    }

    function quickSort(arr, left, right) {
      if (right - left <= 0) {
        return;
      }

      let pivotIndex = partition(arr, left, right);

      quickSort(arr, left, pivotIndex - 1);
      quickSort(arr, pivotIndex, right);
    }

    quickSort(arr, 0, arr.length - 1);
  }

}

export default Sorting;
