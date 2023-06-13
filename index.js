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

sortbtn.addEventListener("click", function () {
  switch (algosort) {
    case "bubble":
      bubbleSort(unsortedarray);
      break;
    default:
      bubbleSort(unsortedarray);
      break;
  }
});
