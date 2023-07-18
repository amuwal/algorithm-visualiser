
import bfs from "../algorithms/bfs";
import dfs from "../algorithms/dfs";
import bidirectionalBfs from "../algorithms/bidirectional-bfs";

const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const handleBiDirectionalBfs = async (
    start,
    target,
    rows,
    cols,
    speed,
    idPrefix = ""
  ) => {
    const [stepByStepQueue, bestPath, timeTaken] = bidirectionalBfs(
      start,
      target,
      rows,
      cols,
      idPrefix
    );
    for (const state of stepByStepQueue) {
      await sleep(speed);
      for (const [r, c] of state) {
        const cell = document.getElementById(idPrefix + `${r}-${c}`);
        if (!cell) return ["was inturpted", -1];
        cell.classList.add("visited");
      }
    }
    if (!bestPath[0].length) return ["no path", -1];
  
    const startIcon = document.getElementById(
      idPrefix + `${start[0]}-${start[1]}`
    ).firstChild;
    const targetIcon = document.getElementById(
      idPrefix + `${target[0]}-${target[1]}`
    ).firstChild;
    startIcon.classList.add("icon-active");
    targetIcon.classList.add("icon-active");
    for (let i = 0; i < bestPath[0].length; i++) {
      const [r, c] = bestPath[0][i];
      await sleep(50);
      const cell = document.getElementById(idPrefix + `${r}-${c}`);
      if (!cell) return ["was inturpted", -1];
      cell.classList.add("best-path");
      if (i === bestPath[1].length) continue;
      const [tr, tc] = bestPath[1][i];
      const cell2 = document.getElementById(idPrefix + `${tr}-${tc}`);
      if (!cell2) return ["was inturpted", -1];
      cell2.classList.add("best-path");
    }
    return [timeTaken, bestPath[0].length + bestPath[1].length - 1];
  };
  
  const handleDfs = async (start, target, rows, cols, speed, idPrefix = "") => {
    const [queue, bestPath, timeTaken] = dfs(start, target, rows, cols, idPrefix);
    for (const [r, c] of queue) {
      await sleep(speed);
      const cell = document.getElementById(idPrefix + `${r}-${c}`);
      if (!cell) return ["was inturpted", -1];
      cell.classList.add("visited");
    }
    const startIcon = document.getElementById(
      idPrefix + `${start[0]}-${start[1]}`
    ).firstChild;
    const targetIcon = document.getElementById(
      idPrefix + `${target[0]}-${target[1]}`
    ).firstChild;
  
    if (!bestPath) return ["no path", -1]; // all paths blocked
    startIcon.classList.add("icon-active");
  
    for (const [r, c] of bestPath) {
      await sleep(50);
      const cell = document.getElementById(idPrefix + `${r}-${c}`);
      if (!cell) return ["was inturpted", -1];
      cell.classList.add("best-path");
    }
  
    targetIcon.classList.add("icon-active");
    return [timeTaken, bestPath.length];
  };
  
  const handleBfs = async (start, target, rows, cols, speed, idPrefix = "") => {
    const [stepByStepQueue, bestPath, timeTaken] = bfs(
      start,
      target,
      rows,
      cols,
      idPrefix
    );
    for (const state of stepByStepQueue) {
      await sleep(speed);
      for (const [r, c] of state) {
        const cell = document.getElementById(idPrefix + `${r}-${c}`);
        if (!cell) return ["was inturpted", -1];
        cell.classList.add("visited");
      }
    } 
  
    if (!bestPath.length) return ["no path", -1]
  
    const startIcon = document.getElementById(
      idPrefix + `${start[0]}-${start[1]}`
    ).firstChild;
    const targetIcon = document.getElementById(
      idPrefix + `${target[0]}-${target[1]}`
    ).firstChild;
  
    startIcon.classList.add("icon-active");
  
    for (const [r, c] of bestPath) {
      await sleep(50);
      const cell = document.getElementById(idPrefix + `${r}-${c}`);
      if (!cell) return ["was inturpted", -1] ;
      cell.classList.add("best-path");
    }
    targetIcon.classList.add("icon-active");
    return [timeTaken, bestPath.length];
  };


export { handleBfs, handleBiDirectionalBfs, handleDfs, sleep };