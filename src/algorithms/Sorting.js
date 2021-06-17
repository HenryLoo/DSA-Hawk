const Sorting = {

  selectionSort: function (arr) {
    let n = arr.length;
    for (let i = 0; i < n; i++) {
      // Find the minimum value in the array from i...n
      let minIndex = i;
      for (let j = i + 1; j < n; j++) {
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }

      // Swap the minimum value's position with the ith element
      let temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
    }

    return arr;
  },
  
}

export default Sorting;
