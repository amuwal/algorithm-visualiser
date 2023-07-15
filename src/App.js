import { useState } from "react";
import Grid from "./components/Grid";
import "./styles/App.css";
import Header from "./components/Header";
import HandleCompare from "./components/HandleCompare";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  console.log("appRender");
  const [speed, setSpeed] = useState(100);
  const [rows, setRows] = useState(10);
  const [cols, setCols] = useState(30);
  const [start, setStart] = useState("0-0");
  const [target, setTarget] = useState("9-29");

  const speedLvlToSpeed = {
    1: 1000,
    2: 500,
    3: 100,
    4: 25,
    5: 5,
  };

  const densityLvlToDensity = {
    1: 5,
    2: 10,
    3: 15,
    4: 25,
    5: 50,
  };

  const handleSpeedLevel = (e) => {
    const lvl = e.target.id[e.target.id.length - 1];
    setSpeed(speedLvlToSpeed[lvl]);
    for (let i = 1; i < 6; i++) {
      const el = document.getElementById(`speed-${i}`);
      if (i <= +lvl) {
        el.classList.add("level-active");
      } else {
        el.classList.remove("level-active");
      }
    }
  };

  const handleDensityLevel = (e) => {
    // do not allow density level 5 for dfs
    const picker = document.querySelector("select");
    const lvl = e.target.id[e.target.id.length - 1];
    const algorithm = picker.options[picker.selectedIndex].value;
    if (algorithm === "dfs" && (lvl === "5" || lvl === "4")){
        handleDfsOnLvl5();
        return
    }
    setRows(densityLvlToDensity[lvl]);
    setCols(densityLvlToDensity[lvl] * 3);
    for (let i = 1; i < 6; i++) {
      const el = document.getElementById(`density-${i}`);
      if (i <= +lvl) {
        el.classList.add("level-active");
      } else {
        el.classList.remove("level-active");
      }
    }
  };

  const handleDfsOnLvl5 = () => {
    const info = document.querySelector(".info");
    const message = document.createElement("p");
    message.innerHTML = "<span style='color:red'> Error: </span>: Dfs not allowed on lvl 4 or lvl 5 density as it is too slow."
    info.appendChild(message);
    info.scrollTop = info.scrollHeight;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path=""
            element={
              <>
                <Header
                  handleDensityLevel={handleDensityLevel}
                  handleSpeedLevel={handleSpeedLevel}
                ></Header>

                <Grid
                  rows={rows}
                  cols={cols}
                  speed={speed}
                  density={rows}
                  start={start}
                  target={target}
                  setStart={setStart}
                  setTarget={setTarget}
                  handleDensityLevel={handleDensityLevel}
                  handleDfsOnLvl5={handleDfsOnLvl5}
                />
              </>
            }
          ></Route>

          <Route
            exact
            path="compare"
            element={<HandleCompare speed={speed} handleSpeedLevel={handleSpeedLevel} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
