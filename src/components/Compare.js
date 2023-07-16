import { useEffect } from "react";
import "../styles/Compare.css";
import { handleBfs, handleBiDirectionalBfs, handleDfs } from "./Grid";

const Compare = ({
  start,
  target,
  rows,
  cols,
  walls,
  speed,
  handleSpeedLevel,
  curPreset,
  setCurPreset,
  setView
}) => {
  useEffect(() => {
    populateGrid("1");
    populateGrid("2");
  }, [curPreset]);

  const populateGrid = (id) => {
    const grid = document.getElementById("grid-" + id);
    grid.innerHTML = "";
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cur = `${r}-${c}`;
        const cell = document.createElement("div");
        cell.id = id + "-" + cur;
        cell.classList.add("cell");
        if (walls.has(cur)) cell.classList.add("wall");
        else if (cur === start) {
          const icon = document.createElement("span");
          icon.classList.add("material-symbols-outlined");
          icon.classList.add("icon");
          icon.id = "entry";
          icon.innerHTML = "psychiatry";
          cell.appendChild(icon);
        } else if (cur === target) {
          const icon = document.createElement("span");
          icon.classList.add("icon");
          icon.classList.add("material-symbols-outlined");
          icon.id = "target";
          icon.innerHTML = "nature";
          cell.appendChild(icon);
        }
        grid.appendChild(cell);
      }
    }
    handleInfo(id);
  };

  const handleInfo = (id) => {
    const info = document.getElementById("info-" + id);
    const detail = document.createElement("p");
    const select = document.getElementById("select-" + id);
    const algorithm = select.options[select.selectedIndex].value;
    detail.innerText = getExplanation(algorithm);
    info.innerHTML = "";
    info.appendChild(detail);
  };

  const getExplanation = (algorithm) => {
    if (algorithm === "dfs") {
      return "Explores a node, recursively explores its unvisited neighbors, and backtracks when necessary.";
    } else if (algorithm === "bfs") {
      return "Visits a node, explores all its neighbors, then moves to the next level of neighbors.";
    } else if (algorithm === "bidirectional-bfs") {
      return "Searches graph from both start and target nodes. Iteratively visits one level of neighbors. Stops when common node found, indicating shortest path.";
    }
  };

  const handleInfoOnAlgorithmChange = (e) => {
    const id = e.target.id[e.target.id.length - 1]
    handleInfo(id);
  }

  const startComparison = async () => {
    const btn = document.getElementById("comparison-btn");
    const icon = btn.firstChild;
    icon.onclick = (e) => {
      e.stopPropagation();
    }; // to stop bubbling
    btn.setAttribute("disabled", "true");
    disableLevels("presets")
    resetGrid();
    await Promise.all([startProcess("1"), startProcess("2")]);
    btn.removeAttribute("disabled");
    icon.onclick = null;
    enableLevels("presets")
  };

  const disableLevels = (levelContainerId) => {
    const container = document.getElementById(levelContainerId);
    const children = Array.from(container.children);
    children.forEach(btn => {
      if (btn.classList.contains("levels")){
        btn.onclick = (e) => {e.stopPropagation();};
        btn.style.cursor = "not-allowed";
        console.log(btn)

      }
    })
  }

  const enableLevels = (levelContainerId) => {
    const container = document.getElementById(levelContainerId);
    const children = Array.from(container.children);
    children.forEach(btn => {
      if (btn.classList.contains("levels")){
        btn.onclick = handlePreset;
        btn.style.cursor = "pointer";
      }
    })
  }

  const startProcess = async (id) => {
    const select = document.getElementById("select-" + id);
    const algorithm = select.options[select.selectedIndex].value;
    const s = start.split("-").map((x) => +x);
    const t = target.split("-").map((x) => +x);
    if (algorithm === "bfs") await handleBfs(s, t, rows, cols, speed, id + "-");
    if (algorithm === "dfs") await handleDfs(s, t, rows, cols, speed, id + "-");
    if (algorithm === "bidirectional-bfs") {
      await handleBiDirectionalBfs(s, t, rows, cols, speed, id + "-");
    }
  };

  const resetGrid = () => {
    const s = start.split("-").map((x) => +x);
    const t = target.split("-").map((x) => +x);
    document
      .getElementById(`1-${s[0]}-${s[1]}`)
      .firstChild.classList.remove("icon-active");
    document
      .getElementById(`1-${t[0]}-${t[1]}`)
      .firstChild.classList.remove("icon-active");
    document
      .getElementById(`2-${s[0]}-${s[1]}`)
      .firstChild.classList.remove("icon-active");
    document
      .getElementById(`2-${t[0]}-${t[1]}`)
      .firstChild.classList.remove("icon-active");

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cell1 = document.getElementById(`1-${r}-${c}`);
        const cell2 = document.getElementById(`2-${r}-${c}`);
        if (!cell1 || !cell2) return;
        cell1.classList.remove("visited");
        cell1.classList.remove("best-path");
        cell2.classList.remove("visited");
        cell2.classList.remove("best-path");
      }
    }
  };

  const handlePreset = (e) => {
    const index = +e.target.id[e.target.id.length - 1];
    setCurPreset(index);
    for (let i = 0; i < 2; i++) {
      console.log("preset-" + index);
      const lvl = document.getElementById("preset-" + i);
      if (i === index) {
        lvl.classList.add("level-active");
      } else {
        lvl.classList.remove("level-active");
      }
    }
  };

  return (
    <div className="compare">   
      <div className="left">
        <select onChange={handleInfoOnAlgorithmChange} id="select-1" defaultValue={"bidirectional-bfs"}>
          <option value="bfs">bfs</option>
          <option value="dfs">dfs</option>
          <option value="bidirectional-bfs">bidirectional-bfs</option>
        </select>
        <div
          id="grid-1"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr ".repeat(cols),
            gridTemplateRows: "1fr ".repeat(rows),
          }}
        ></div>
        <div id="info-1" className="info"></div>
      </div>

      <div className="mid">
        <div id="speed-level" className="levels-container">
          <legend>Speed</legend>
          <div
            onClick={handleSpeedLevel}
            className="levels level-active"
            id="speed-1"
          ></div>
          <div
            onClick={handleSpeedLevel}
            className="levels level-active"
            id="speed-2"
          ></div>
          <div
            onClick={handleSpeedLevel}
            className="levels level-active"
            id="speed-3"
          ></div>
          <div onClick={handleSpeedLevel} className="levels" id="speed-4"></div>
          <div onClick={handleSpeedLevel} className="levels" id="speed-5"></div>
        </div>

        <div id="presets" className="levels-container">
          <legend>Grid</legend>
          <div
            onClick={handlePreset}
            className="levels level-active"
            id="preset-0"
          ></div>
          <div onClick={handlePreset} className="levels" id="preset-1"></div>
        </div>

        <button id="comparison-btn" onClick={startComparison}>
          <span className="play material-symbols-outlined">play_arrow</span>
        </button>
        <button
          id="visualize-btn"
          onClick={() => {  
            setView("grid");
          }}
        >
          Go back
        </button>
      </div>

      <div className="right">
        <select onChange={handleInfoOnAlgorithmChange} id="select-2" defaultValue={"dfs"}>
          <option value="bfs">bfs</option>
          <option value="dfs">dfs</option>
          <option value="bidirectional-bfs">bidirectional-bfs</option>
        </select>
        <div
          id="grid-2"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr ".repeat(cols),
            gridTemplateRows: "1fr ".repeat(rows),
          }}
        ></div>
        <div id="info-2" className="info"></div>
      </div>
    </div>
  );
};
export default Compare;
