var Sortbtn = document.getElementById('Sort');
var autoNumber = document.getElementById('randombtn');
var arrayA = document.getElementById('arrayA');
var SelectionSortBtn = document.getElementById('SelectionSortbtn');
var MergeSortBtn = document.getElementById('MergeSortbtn');
var HeapSortBtn = document.getElementById('HeapSortbtn');

//returnValue
var output = document.getElementById("outputArray");
var sorttype = document.getElementById("SortType");
var time = document.getElementById("Time");

//Generate Numbers
autoNumber.addEventListener('click', function () {
    var n = document.getElementById('autoNumbers').value;
    if (n < 10000000) {
      var s = "";
      arrayA.value = s;
      for( i = 0; i < n; i++){
          if( i == n-1)
              s = s + Math.floor(Math.random()* (n - 1) );
          else
              s = s + Math.floor(Math.random()* (n - 1) ) +", ";
      }
      arrayA.value = s;
    } else {
      var conf = confirm("Are you sure? This huge numbers of number can crash your browser. Consider using Chrome for this.");
      if (conf == true) {
        var s = "";
        arrayA.value = s;
        for( i = 0; i < n; i++){
            if( i == n-1)
                s = s + Math.floor(Math.random()* (n - 1) );
            else
                s = s + Math.floor(Math.random()* (n - 1) ) +", ";
        }
        arrayA.value = s;
      }
      else {
        
      }
    }

});
//Turn input into array
function toArray(s) {
    var A = [];
    s = s.split(",");
    for(i = 0; i <  s.length; i++){
        A[i] = parseInt( s[i] );
    }
    return A;
}

function swap(items, a, b){
    var temp = items[a];
    items[a] = items[b];
    items[b] = temp;
    return items;
}

//Dummy button
Sortbtn.addEventListener("click", function () {
    var A = toArray(arrayA.value);

    //SS
    var t0 = performance.now();
    SelectionSort(A);
    var t1 = performance.now();
    var sst = t1-t0;
    printTableContent(1, sst + "");
    //MS
    var t0 = performance.now();
    mergeSort(A);
    var t1 = performance.now();
    var mst = t1-t0;
    printTableContent(2, mst + "");
    //HS
    var t0 = performance.now();
    heapSort(A);
    var t1 = performance.now();
    var hst = t1-t0;
    printTableContent(3, hst + "");

    if (sst < mst && sst < hst) {
      //sst is the fastest
      boldFastest(1);
    }
    if (mst < sst && mst < hst) {
      //mst is the fastest
      boldFastest(2);
    }
    if (hst < sst && hst < mst) {
      //hst is the fastest
      boldFastest(3);
    }

  });

function boldFastest(index){
  for (var i = 1; i <= 3; i++) {
    var r = document.getElementById('td'+i);
    if (i != index) {
        r.className = "";
    }else {
        r.className = "fastest";
    }
  }
}

//Selection Sort Button
SelectionSortBtn.addEventListener("click", function () {
    var InputArray = toArray(arrayA.value);
    var t0 = performance.now();
    SelectionSort(InputArray);
    var t1 = performance.now();
    var s = "";
    for(i = 0; i < InputArray.length; i++){
            if(i == InputArray.length-1){
                 s = s + InputArray[i] + ".";
            }else{
                 s = s + InputArray[i] + ", ";
            }
        }
        var time = t1-t0;
    printResult("Selection Sort", time, s);

 });

//Merge Sort Button
MergeSortBtn.addEventListener("click", function () {
    var InputArray = toArray(arrayA.value);
    var t0 = performance.now();
    var A = mergeSort(InputArray);
    var t1 = performance.now();
    var s = "";
    for(i = 0; i < A.length; i++){
        if(i == A.length - 1) {
            s = s + A[i] + ".";
        }
        else {
            s = s + A[i] +", ";
        }
    }
    printResult("Merge Sort", (t1-t0), s);
  });

//Heap Sort Button
HeapSortBtn.addEventListener("click", function () {
    var InputArray = toArray(arrayA.value);
    t0 = performance.now();
    heapSort(InputArray);
    t1 = performance.now();
    var s = "";
    for (var i = 0; i < InputArray.length; i++) {
      if (i == InputArray.length-1) {
          s = s + InputArray[i] + ".";
      }else {
        s = s + InputArray[i] + ", ";
      }
    }
    printResult("Heap Sort", (t1-t0), s);

  })

//Selection Sort Algorithm
function SelectionSort (A) {
    for(i = 0; i < A.length; i++){
        var min = i;
        for(j = i+1; j < A.length; j++){
            if(A[j] < A[min])
                min = j;
        }

        if(i != min){
            swap(A, i, min);
        }
    }
  }

//
function mergeSort (arr) {
    if (arr.length < 2) return arr;

    var mid = Math.floor(arr.length /2);
    var subLeft = mergeSort(arr.slice(0,mid));
    var subRight = mergeSort(arr.slice(mid));

    return merge(subLeft, subRight);
}

function merge(left, right)
{
    var result = [];

    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    while (left.length)
        result.push(left.shift());

    while (right.length)
        result.push(right.shift());

    return result;
}

//HeapSort Algorithm
function heapSort(input) {

    array_length = input.length;

    for (var i = Math.floor(array_length / 2); i >= 0; i -= 1)      {
        heap_root(input, i);
      }

    for (i = input.length - 1; i > 0; i--) {
        swap(input, 0, i);
        array_length--;
        heap_root(input, 0);
    }
}
function heap_root(input, i) {
    var left = 2 * i + 1;
    var right = 2 * i + 2;
    var max = i;

    if (left < array_length && input[left] > input[max]) {
        max = left;
    }

    if (right < array_length && input[right] > input[max])     {
        max = right;
    }

    if (max != i) {
        swap(input, i, max);
        heap_root(input, max);
    }
}

//function print Result
function printResult(type, t, s){
    sorttype.innerHTML = "<h4>Sort Type: " + type + "</h4>";
    time.innerHTML = "<h4> Time taken: " + t +"ms</h4>";
    output.innerText = s;
}

function printTableContent(index, s){
  var r = document.getElementById('td'+index);
  r.innerHTML = s + "ms";
}
