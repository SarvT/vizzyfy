import React, { useEffect, useState } from "react";

const App = () => {
  const [bars, setBars] = useState([10, 10, 10, 10, 10, 10, 10, 10]);
  const [algorithm, setAlgorithm] = useState("bubbleSort");
  const [highlightedBars, setHighlightedBars] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [animValue, setAnimValue] = useState(1);
  const [barLength, setBarLEngth] = useState(1);
  const appName = "VizzyFy";
  //   const appName = "Algorithm Visualizer";

  const Bar = ({ height, index }) => (
    <div className="mx-2 text-center">
      <div
        className={`h-${height * barLength} bg-${
          highlightedBars.includes(index) ? "green-500" : "blue-500"
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

  const handleSort = () => {
    const sortingAlgorithm = {
      bubbleSort,
      insertionSort,
      selectionSort,
    };

    if (sortingAlgorithm[algorithm]) {
      sortingAlgorithm[algorithm]([...bars]);
    }
  };

  const handleArrayInput = (e) => {
    const inputArray = e.target.value.split(",").map(Number);
    setBars(inputArray);
  };

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
          className={`mt-4 mx-4 px-4 py-2 ${
            isSorting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600"
          } text-white rounded`}
        >
          Reset
        </button>
        {/* <button onClick={()=>{setBars([])}}>Reset</button> */}
      </div>
      {/* <div className="sort-status"><button></button></div> */}
    </div>
  );
};

export default App;
