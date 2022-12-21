let randomize_array = document.getElementById("randomize_array_btn");
let sort_btn = document.getElementById("sort_btn");
let bars_container = document.getElementById("bars_container");
let slider = document.getElementById("slider");
let minRange = 1;
let maxRange = 100;
let numOfBars = 10;
let heightFactor = 6;
let speedFactor = 500;
let unsorted_array = new Array(numOfBars);

slider.addEventListener("input", function () {
  numOfBars = slider.value;
  // maxRange = slider.value;
  //console.log(numOfBars);
  bars_container.innerHTML = "";
  unsorted_array = createRandomArray();
  renderBars(unsorted_array);
});

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomArray() {
  let array = new Array(numOfBars);
  for (let i = 0; i < numOfBars; i++) {
    array[i] = randomNum(minRange, maxRange);
  }

  return array;
}

document.addEventListener("DOMContentLoaded", function () {
  unsorted_array = createRandomArray();
  renderBars(unsorted_array);
});

function renderBars(array) {
  for (let i = 0; i < numOfBars; i++) {
    let bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = array[i] * heightFactor + "px";
    bars_container.appendChild(bar);
  }
}

randomize_array.addEventListener("click", function () {
  unsorted_array = createRandomArray();
  bars_container.innerHTML = "";
  renderBars(unsorted_array);
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}



async function swap(items, leftIndex, rightIndex, bars) {
  var temp = items[leftIndex];
  items[leftIndex] = items[rightIndex];
  items[rightIndex] = temp;
  bars[leftIndex].style.height = items[leftIndex] * heightFactor + "px";
  bars[leftIndex].style.backgroundColor = "lightgreen";
  //bars[leftIndex].innerText = items[leftIndex];
  bars[rightIndex].style.height = items[rightIndex] * heightFactor + "px";
  bars[rightIndex].style.backgroundColor = "lightgreen";
  //bars[rightIndex].innerText = items[rightIndex];
  await sleep(speedFactor);
}
async function partition(items, left, right) {
  let bars = document.getElementsByClassName("bar");
  let pivotIndex = Math.floor((right + left) / 2);
  var pivot = items[pivotIndex]; //middle element
  bars[pivotIndex].style.backgroundColor = "red";

  for (let i = 0; i < bars.length; i++) {
    if (i != pivotIndex) {
      bars[i].style.backgroundColor = "aqua";
    }
  }

  (i = left), //left pointer
    (j = right); //right pointer
  while (i <= j) {
    while (items[i] < pivot) {
      i++;
    }
    while (items[j] > pivot) {
      j--;
    }
    if (i <= j) {
      await swap(items, i, j, bars); //sawpping two elements
      i++;
      j--;
    }
  }
  return i;
}

async function quickSort(items, left, right) {
  var index;
  let bars = document.getElementsByClassName("bar");
  if (items.length > 1) {
    index = await partition(items, left, right); //index returned from partition
    if (left < index - 1) {
      //more elements on the left side of the pivot
      await quickSort(items, left, index - 1);
    }
    if (index < right) {
      //more elements on the right side of the pivot
      await quickSort(items, index, right);
    }
  }

  for (let i = 0; i < bars.length; i++) {
    bars[i].style.backgroundColor = "aqua";
  }
  return items;
}

sort_btn.addEventListener("click", function () {
  let sorted_array = quickSort(unsorted_array, 0, numOfBars - 1);
  console.log(sorted_array);
});

var slide = document.getElementById("slider");
var output = document.getElementById("demo");
output.innerHTML = slide.value;

slide.oninput = function() {
  output.innerHTML = this.value;
}

// let randomize_array = document.getElementById("randomize_array_btn");
// let sort_btn = document.getElementById("sort_btn");
// let bars_container = document.getElementById("bars_container");
// let slider = document.getElementById("slider");
// let minRange = 1;
// let maxRange = 80;
// let numOfBars = 10;
// let heightFactor = 6;
// let unsorted_array = new Array(numOfBars);

// slider.addEventListener("input", function () {
//   numOfBars = slider.value;
//   // maxRange = slider.value;
//   //console.log(numOfBars);
//   bars_container.innerHTML = "";
//   unsorted_array = createRandomArray();
//   renderBars(unsorted_array);
// });

// function randomNum(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// } //this

// function createRandomArray() {
//   let array = new Array(numOfBars);
//   for (let i = 0; i < numOfBars; i++) {
//     array[i] = randomNum(minRange, maxRange);
//   }

//   return array;
// } //this

// document.addEventListener("DOMContentLoaded", function () {
//   unsorted_array = createRandomArray();
//   renderBars(unsorted_array);
// }); //this

// function renderBars(array) {
//   for (let i = 0; i < numOfBars; i++) {
//     let bar = document.createElement("div");
//     bar.classList.add("bar");
//     bar.style.height = array[i] * heightFactor + "px";
//     bars_container.appendChild(bar);
//   } //this
// }

// randomize_array.addEventListener("click", function () {
//   unsorted_array = createRandomArray();
//   bars_container.innerHTML = "";
//   renderBars(unsorted_array);
// }); // this

// function sleep(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// } // this

// async function bubbleSort(array) {
//   let bars = document.getElementsByClassName("bar");
//   for (let i = 0; i < array.length; i++) {
//     for (let j = 0; j < array.length - i - 1; j++) {
//       if (array[j] > array[j + 1]) {
//         for (let k = 0; k < bars.length; k++) {
//           if (k !== j && k !== j + 1) {
//             bars[k].style.backgroundColor = "aqua";
//           }
//         }
//         let temp = array[j];
//         array[j] = array[j + 1];
//         array[j + 1] = temp;
//         bars[j].style.height = array[j] * heightFactor + "px";
//         bars[j].style.backgroundColor = "lightgreen";
//         //bars[j].innerText = array[j];
//         bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
//         bars[j + 1].style.backgroundColor = "lightgreen";
//         //bars[j + 1].innerText = array[j + 1];
//         await sleep(30);
//       }
//     }
//     await sleep(30);
//   }
//   return array;
// } //this

// sort_btn.addEventListener("click", function () {
//   bubbleSort(unsorted_array);
// }
// );

// var output = document.getElementById("demo");
// output.innerHTML = slider.value;
// slider.oninput = function() {
//   output.innerHTML = this.value;
// }

// var soutput= document.getElementById("sdemo");
// soutput.innerHTML=speed.value;
// speed.oninput=function(){
//   soutput.innerHTML=this.value;
// }