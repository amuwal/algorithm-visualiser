import React, { useEffect } from "react";
import "../styles/Grid.css";
import bfs from "../algorithms/bfs";
import dfs from "../algorithms/dfs";
import bidirectionalBfs from "../algorithms/bidirectional-bfs";

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const proTips = [
  "<span style='color:pink'> Protip </span>: You can also press Enter key to start visualizing",
  "<span style='color:pink'> Protip </span>: Click on 'Compare algorithms' to compare algorithms side by side",
  "<span style='color:pink'> Protip </span>: Change algorithm from drop down menu",
  "<span style='color:pink'> Protip </span>: You can also change Speed and Grid density by clicking on the circles above",
];

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
      if (!cell) return;
      cell.classList.add("visited");
    }
  }
  if (!bestPath[0].length) return;
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
    if (!cell) return;
    cell.classList.add("best-path");
    if (i === bestPath[1].length) continue;
    const [tr, tc] = bestPath[1][i];
    const cell2 = document.getElementById(idPrefix + `${tr}-${tc}`);
    if (!cell2) return;
    cell2.classList.add("best-path");
  }
  return [timeTaken, bestPath[0].length + bestPath[1].length - 1];
};

const handleDfs = async (start, target, rows, cols, speed, idPrefix = "") => {
  const [queue, bestPath, timeTaken] = dfs(start, target, rows, cols, idPrefix);
  for (const [r, c] of queue) {
    await sleep(speed);
    const cell = document.getElementById(idPrefix + `${r}-${c}`);
    if (!cell) return;
    cell.classList.add("visited");
  }
  const startIcon = document.getElementById(
    idPrefix + `${start[0]}-${start[1]}`
  ).firstChild;
  const targetIcon = document.getElementById(
    idPrefix + `${target[0]}-${target[1]}`
  ).firstChild;

  if (!bestPath) return; // all paths blocked
  startIcon.classList.add("icon-active");

  for (const [r, c] of bestPath) {
    await sleep(50);
    const cell = document.getElementById(idPrefix + `${r}-${c}`);
    if (!cell) return;
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
      if (!cell) return;
      cell.classList.add("visited");
    }
  }
  if (!bestPath.length) return; // no path found

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
    if (!cell) return;
    cell.classList.add("best-path");
  }
  targetIcon.classList.add("icon-active");
  return [timeTaken, bestPath.length];
};

const Grid = ({
  rows,
  cols,
  speed,
  start,
  target,
  setStart,
  setTarget,
  handleDensityLevel,
  handleDfsOnLvl5,
}) => {
  window.onmouseup = () => {
    window.mousedown = false;
  };
  window.ondrop = () => {
    window.mousedown = false;
  };
  window.onclick = (e) => {
    window.mousedown = false;
  };
  window.onkeydown = (e) => {
    if (e.key === "Enter") {
      const btn = document.getElementById("start-btn");
      if (btn) btn.click();
    }
  };

  const startProcess = async (e) => {
    // don't run dfs on level 5 density
    const picker = document.querySelector("select");
    const algorithm = picker.options[picker.selectedIndex].value;
    const densityIs5 = document.getElementById("density-5").classList.contains("level-active");
    const densityIs4 = document.getElementById("density-4").classList.contains("level-active");
    if ((densityIs5 || densityIs4) &&  algorithm === "dfs"){
      handleDfsOnLvl5();
      return
    }


    resetGrid();
    handleProTips();

    disableBtnById("start-btn");
    disableBtnById("reset-btn");
    disableLevels("density-levels");

    document.getElementById("reset-btn").setAttribute("disabled", true);
    const start = document.getElementById("entry").parentElement.id;
    const target = document.getElementById("target").parentElement.id;
    const s = start.split("-").map((x) => +x);
    const t = target.split("-").map((x) => +x);

    let timeTaken = "something went wrong ";
    let pathLength = -1;
    if (algorithm === "bfs") {
      [timeTaken, pathLength] = await handleBfs(s, t, rows, cols, speed);
    } else if (algorithm === "dfs") {
      [timeTaken, pathLength] = await handleDfs(s, t, rows, cols, speed);
    } else if (algorithm === "bidirectional-bfs") {
      [timeTaken, pathLength] = await handleBiDirectionalBfs(
        s,
        t,
        rows,
        cols,
        speed
      );
    }

    enableBtnById("start-btn");
    enableBtnById("reset-btn");
    enableLevels("density-levels");

    showDetails(timeTaken, pathLength);
  };

  const showDetails = (timeTaken, pathLength) => {
    const detail = document.createElement("p");
    detail.innerHTML =
      timeTaken === undefined
        ? "It seems there is no path"
        : `completed calculations in <b> ${timeTaken} ms </b> and path-length is <b> ${pathLength} </b>`;
    const info = document.querySelector(".info");
    info.appendChild(detail);
    info.scrollTop = info.scrollHeight;
  };

  const disableBtnById = (id) => {
    const btn = document.getElementById(id);
    btn.setAttribute("disabled", true);
  };

  const enableBtnById = (id) => {
    const btn = document.getElementById(id);
    btn.removeAttribute("disabled");
  };

  const disableLevels = (levelContainerId) => {
    const container = document.getElementById(levelContainerId);
    const children = Array.from(container.children);
    children.forEach((lvl) => {
      if (
        lvl.classList.contains("levels") &&
        lvl.classList.contains("level-active")
      ) {
        lvl.onclick = (e) => {
          e.stopPropagation();
        };
        lvl.style.cursor = "not-allowed";
      }
    });
  };

  const enableLevels = (levelContainerId) => {
    const container = document.getElementById(levelContainerId);
    const children = Array.from(container.children);
    children.forEach((lvl) => {
      if (lvl.classList.contains("levels")) {
        // there could also be legend
        lvl.onclick = handleDensityLevel;
        lvl.style.cursor = "pointer";
      }
    });
  };

  const resetGrid = (e, resetWallsAsWell = false) => {
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cell = document.getElementById(`${r}-${c}`);
        if (!cell) return;
        if (cell.firstChild) {
          // only start and target have any child
          cell.firstChild.classList.remove("icon-active");
        }
        cell.classList.remove("visited");
        cell.classList.remove("best-path");
        if (resetWallsAsWell) cell.classList.remove("wall");
      }
    }
  };

  const handleProTips = () => {
    const proTipTime = Math.random() * 10 > 5;
    if (!proTipTime) return;
    const info = document.querySelector(".info");
    const proTip = proTips[Math.floor(Math.random() * proTips.length)];
    const p = document.createElement("p");
    p.innerHTML = proTip;
    info.appendChild(p);
    info.scrollTop = info.scrollHeight;
  };

  useEffect(() => {
    console.log("Grid useeffect");

    const newGrid = document.createElement("div");
    newGrid.classList.add("grid");
    newGrid.id = "grid";
    newGrid.style.display = "grid";
    newGrid.style.gridTemplateColumns = "1fr ".repeat(cols);
    newGrid.style.gridTemplateRows = "1fr ".repeat(rows);

    newGrid.onmousedown = () => {
      window.mousedown = true;
    };

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cur = `${r}-${c}`;
        const cell = document.getElementById(cur)
          ? document.getElementById(cur)
          : document.createElement("div");

        if (cell.id) {
          newGrid.appendChild(cell);
          continue; // don't make cell again if it was already there (optional)
        }

        cell.key = cur;
        cell.id = cur;
        cell.classList.add("cell");
        cell.ondragover = allowDrag;
        cell.ondrop = drop;
        cell.ondragstart = drag;
        cell.onmouseover = handleWallGeneration;
        cell.onmousedown = handleWallGeneration;
        if (cur === start) {
          const icon = document.createElement("span");
          icon.draggable = "true";
          icon.ondragstart = drag;
          icon.classList.add("material-symbols-outlined");
          icon.classList.add("icon");
          icon.id = "entry";
          icon.innerHTML = "psychiatry";
          cell.appendChild(icon);
        } else if (cur === target) {
          const icon = document.createElement("span");
          icon.classList.add("icon");
          icon.draggable = "true";
          icon.ondragstart = drag;
          icon.classList.add("material-symbols-outlined");
          icon.id = "target";
          icon.innerHTML = "nature";
          cell.appendChild(icon);
        }
        newGrid.appendChild(cell);
      }
    }

    const [tr, tc] = target.split("-").map((x) => +x);
    if (tr >= rows || tc >= cols) {
      setTarget(`${rows - 1}-${cols - 1}`);
      newGrid.lastChild.id = "target";
    }
    const [r, c] = start.split("-").map((x) => +x);
    if (r >= rows || c >= cols) {
      setStart(`${0}-${0}`);
      newGrid.firstChild.id = "entry";
    }

    const main = document.querySelector(".main");
    main.removeChild(main.lastChild);
    main.appendChild(newGrid);
  }, [rows, speed, start, target]);

  const handleWallGeneration = (e) => {
    const cell = e.target;
    if (!e.target.classList.contains("cell")) return;
    if (cell.childElementCount !== 0) return;
    if (e.type === "mouseover" && window.mousedown) {
      cell.classList.add("wall");
    } else if (e.type === "mousedown") {
      cell.classList.toggle("wall");
    }
  };

  const allowDrag = (e) => {
    e.preventDefault();
  };

  const drag = (e) => {
    if (e.target.classList.contains("cell")) return;
    e.dataTransfer.setData("text", e.target.id);
  };

  const drop = (e) => {
    e.preventDefault();
    if (
      !e.target.classList.contains("cell") ||
      e.target.classList.contains("wall")
    )
      return;
    const id = e.dataTransfer.getData("text");
    const element = document.getElementById(id);
    console.log(element, e.target.id);
    if (element === null) return;
    e.target.appendChild(element);
    if (id === "entry") setStart(e.target.id);
    if (id === "target") setTarget(e.target.id);
    const btn = document.getElementById("start-btn");
    btn.click();
  };

  return (
    <div className="main">
      <div className="grid-buttons-container">
        <button id="start-btn" onClick={startProcess}>
          Start
        </button>
        <button
          id="reset-btn"
          onClick={(e) => {
            resetGrid(e, true);
          }}
        >
          Reset walls
        </button>
      </div>
      <div className="info">
        <p>Details about runtime and stuff will show up here</p>
      </div>
      <div
        className="grid"
        id="grid"
        style={{
          display: "grid",
          gridTemplateRows: "1fr ".repeat(rows),
          gridTemplateColumns: "1fr ".repeat(cols),
        }}
      ></div>
    </div>
  );
};

export { handleBfs, handleBiDirectionalBfs, handleDfs, sleep };
export default Grid;
