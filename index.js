let randomizearray = document.getElementById("rbtn");
let sortbtn = document.getElementById("sortbtn");
let bars = document.getElementById("bars");
let speed = document.getElementById("speed");
let select = document.getElementById("algo");
let slider = document.getElementById("slider");
let min = 1;
let max = slider.value;
let numbars = slider.value;
let heightfactor = 5;
let speedfactor = 100;
let unsortedarray = new Array(numbars);

function randomnum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createArray() {
  let array = new Array(numbars);
  for (let i = 0; i < numbars; i++) {
    array[i] = randomnum(min, max);
  }
  return array;
}

slider.addEventListener("input", function () {
  numbars = slider.value;
  max = slider.value;
  bars.innerHTML = "";
  unsortedarray = createArray();
  renderbars(unsortedarray);
});

function renderbars(array) {
  for (let i = 0; i < numbars; i++) {
    let bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = array[i] * heightfactor + "px";
    bars.appendChild(bar);
  }
}

speed.addEventListener("change", (e) => {
  speedfactor = parseInt(e.target.value);
});

let algosort = "";

select.addEventListener("change", function () {
  algosort = select.value;
});

document.addEventListener("DOMContentLoaded", function () {
  unsortedarray = createArray();
  renderbars(unsortedarray);
});

randomizearray.addEventListener("click", function () {
  unsortedarray = createArray();
  bars.innerHTML = "";
  renderbars(unsortedarray);
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function bubbleSort(array) {
  let bars = document.getElementsByClassName("bar");
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        for (let k = 0; k < bars.length; k++) {
          if (k !== j && k !== j + 1) {
            bars[k].style.backgroundColor = "pink";
          }
        }
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        bars[j].style.height = array[j] * heightfactor + "px";
        bars[j].style.backgroundColor = "yellow";
        bars[j + 1].style.height = array[j + 1] * heightfactor + "px";
        bars[j + 1].style.backgroundColor = "yellow";
        
        await sleep(speedfactor);
      }
    }
    await sleep(speedfactor);
  }
  return array;
}

async function insertionSort(array) {
  let bars = document.getElementsByClassName("bar");
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      for (let k = 0; k < bars.length; k++) {
        if (k !== j && k !== i) {
          bars[k].style.backgroundColor = "pink";
        }
      }
      array[j + 1] = array[j];
      bars[j + 1].style.height = array[j + 1] * heightfactor + "px";
      bars[j + 1].style.backgroundColor = "yellow";
      j = j - 1;
      await sleep(speedfactor);
    }
    array[j + 1] = key;
    bars[j + 1].style.height = key * heightfactor + "px";
    bars[j + 1].style.backgroundColor = "yellow";
  }
  return array;
}



async function quickSort(array, low, high) {
  if (low < high) {
    const pivotIndex = await partition(array, low, high);
    await quickSort(array, low, pivotIndex - 1);
    await quickSort(array, pivotIndex + 1, high);
  }
}

async function partition(array, low, high) {
  let pivot = array[high];
  let bars = document.getElementsByClassName("bar");
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (array[j] < pivot) {
      i++;
      [array[i], array[j]] = [array[j], array[i]];

      for (let k = 0; k < bars.length; k++) {
        if (k !== i && k !== j) {
          bars[k].style.backgroundColor = "pink";
        }
      }

      bars[i].style.height = array[i] * heightfactor + "px";
      bars[j].style.height = array[j] * heightfactor + "px";

      await sleep(speedfactor);
    }
  }

  [array[i + 1], array[high]] = [array[high], array[i + 1]];

  bars[i + 1].style.height = array[i + 1] * heightfactor + "px";
  bars[high].style.height = array[high] * heightfactor + "px";

  return i + 1;
}

sortbtn.addEventListener("click", async function () {
  switch (algosort) {
    case "bubble":
      await bubbleSort(unsortedarray);
      break;
    case "insertion":
      await insertionSort(unsortedarray);
      break;
    
    case "quick":
      await quickSort(unsortedarray, 0, unsortedarray.length - 1);
      break;
    default:
      await bubbleSort(unsortedarray);
      break;
  }
});
