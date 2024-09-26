import React, { useEffect, useState } from "react";



const App = () => {
  const [bars, setBars] = useState([10, 10, 10, 10, 10, 10, 10, 10]);
  const [algorithm, setAlgorithm] = useState("bubbleSort");
  const [highlightedBars, setHighlightedBars] = useState([]);
  const [prevBars, setPrevBars] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [animValue, setAnimValue] = useState(1);
  const [barLength, setBarLEngth] = useState(1);
  const appName = "VizzyFy";
  //   const appName = "Algorithm Visualizer";

  const delay = async (ms) => {await new Promise((resolve)=>setTimeout(resolve, ms*100))};

  const Bar = ({ height, index }) => (
    <div className="mx-2 text-center">
      <div
        className={`h-${height * barLength} bg-${
          highlightedBars.includes(index) ? "green-600" : "blue-500"
        } mx-1`}
        style={{ height: `${height * barLength}px`, width: "20px" }}
      ></div>
      <div className="bar-value">{height}</div>
    </div>
  );

  const BarVisualizer = () => (
    <div className="flex items-end justify-center h-64">
      {bars.map((height, index) => (
        <Bar key={index} height={height} index={index} />
      ))}
    </div>
  );

  const bubbleSort = async (arr) => {
    setIsSorting(true);
    let n = arr.length;
    let swapped;

    do {
      swapped = false;
      for (let i = 0; i < n - 1; i++) {
        setHighlightedBars([i, i + 1]);
        if (arr[i] > arr[i + 1]) {
          let temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
          swapped = true;
          setBars([...arr]);
          await new Promise((resolve) => setTimeout(resolve, animValue * 100));
        }
        setHighlightedBars([]);
      }
      n--;
    } while (swapped);

    setIsSorting(false);
    return arr;
  };

  const insertionSort = async (arr) => {
    setIsSorting(true);
    let n = arr.length;

    for (let i = 1; i < n; i++) {
      let key = arr[i];
      let j = i - 1;
      setHighlightedBars([i]);

      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j = j - 1;
        setBars([...arr]);
        await new Promise((resolve) => setTimeout(resolve, animValue * 100));
      }
      arr[j + 1] = key;
      setBars([...arr]);
      setHighlightedBars([]);
    }

    setIsSorting(false);
    return arr;
  };

  const selectionSort = async (arr) => {
    setIsSorting(true);
    let n = arr.length;
    let swapped;

    for (let i = 0; i < n - 1; i++) {
      swapped = false;

      for (let j = i + 1; j < n; j++) {
        setHighlightedBars([i, j]);
        if (arr[i] > arr[j]) {
          let temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
          swapped = true;
          setBars([...arr]);
          await new Promise((resolve) => setTimeout(resolve, animValue * 100));
        }
        setHighlightedBars([]);
      }
    }
    n--;
    
    setIsSorting(false);
    return arr;
  };
  
  const partition = async(arr, low, high)=> {
    setIsSorting(true)

    let pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      setHighlightedBars([j, high]);


      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setBars([...arr]);
        await delay(animValue)
        // await new Promise((resolve) => setTimeout(resolve, animValue * 100));
      }
      setHighlightedBars([])
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setBars([...arr]);
    setIsSorting(false);
    return i + 1;
  }

  const quickSort = async (arr, low=0, high=arr.length-1) => {
    if (low >= high) return;

    let pi = await partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  };

  const mergeSort = async(arr)=>{
    setIsSorting(true);
    async function merge(left, right){
      let result = [], leftIdx = 0, rightIdx = 0;

      while(leftIdx<left.length && rightIdx<right.length){
        setHighlightedBars([leftIdx, rightIdx]);
        await delay(animValue);
        
        if(left[leftIdx]<right[rightIdx]){
          result.push(left[leftIdx]);
          leftIdx++;
        } else {
          
          result.push(right[rightIdx]);
          rightIdx++;
        }
        setBars([...result, ...left.slice(leftIdx), ...right.slice(rightIdx)]);
        await delay(animValue);
        setHighlightedBars([]);
      }
      return result.concat(left.slice(leftIdx)).concat(right.slice(rightIdx));
    }

    async function mergeSortHelper(arr){
      if(arr.length<=1) return arr;

      const mid = Math.floor(arr.length/2);
      const left = await mergeSortHelper(arr.slice(0, mid));
      const right = await mergeSortHelper(arr.slice(mid));

      return await merge(left, right);
    }
    const sortedArr = await mergeSortHelper(arr);
    setBars(sortedArr);
    setIsSorting(false);
    return sortedArr;
  }

  const handleSort = () => {
    const sortingAlgorithm = {
      bubbleSort,
      insertionSort,
      selectionSort,
      quickSort,
      mergeSort,
    };
    if (sortingAlgorithm[algorithm]) {

      sortingAlgorithm[algorithm]([...bars]);
    }
  };

  const handleArrayInput = (e) => {
    const inputArray = e.target.value.split(",").map(Number);
    setBars(inputArray);
    setPrevBars(inputArray);
  };

  const handlleReset = () =>{
    setBars(([...prevBars]));
    setHighlightedBars([])
  }
  //   useEffect(handleArrayInput, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl mb-4">{appName}</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter array, e.g., 5,3,8,6"
          className="border border-gray-300 p-2 mr-4"
          onChange={handleArrayInput}
        />
        <select
          className="border border-gray-300 p-2"
          onChange={(e) => setAlgorithm(e.target.value)}
        >
          <option value="bubbleSort">Bubble Sort</option>
          <option value="insertionSort">Insertion Sort</option>
          <option value="selectionSort">Selection Sort</option>
          <option value="quickSort">Quick Sort</option>
          <option value="mergeSort">Merge Sort</option>
        </select>
        <div className="anim-input block mx-2 text-center items-center">
          <label className="block" htmlFor="animValue">
            Animation Value: {animValue}
          </label>
          <input
            className="inline-block"
            onChange={(e) => {
              setAnimValue(e.target.value);
            }}
            type="range"
            name="animation-range"
            id="animation-range"
            min={1}
            max={10}
            placeholder="2"
            defaultValue={1}
          />
        </div>
        <div className="anim-input block mx-2 text-center items-center">
          <label className="block" htmlFor="animValue">
            Bar Height: {barLength}
          </label>
          <input
            className="inline-block"
            onChange={(e) => {
              setBarLEngth(e.target.value);
            }}
            type="range"
            name="bar-length"
            id="bar-length"
            min={1}
            max={20}
            placeholder="2"
            defaultValue={1}
          />
        </div>
      </div>
      <BarVisualizer />
      <div className="buttons">
        <button
          onClick={handleSort}
          disabled={isSorting}
          className={`mt-4 mx-4 px-4 py-2 ${
            isSorting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white rounded`}
        >
          {isSorting ? "Sorting..." : "Sort"}
        </button>
        <button
        onClick={handlleReset}
          className={`mt-4 mx-4 px-4 py-2 ${
            isSorting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600"
          } text-white rounded`}
        >
          Reset
        </button>
      </div>
      <div className="example-arr bg-green-600 rounded m-2 p-2 text-white shadow-lg">You can use this array for example <br />
      98, 85, 47, 39, 42, 93, 32, 60, 24, 82, 80, 92, 12, 11, 99, 45, 65, 30, 75, 44</div>
    </div>
  );
};

export default App;
