import { useState } from "react";
import Grid from "./Grid";
import UI from "./Ui";
import Header from "./Header";

const LandingPage = ({
  handleDensityLevel,
  handleSpeedLevel,
  rows,
  cols,
  speed,
  start,
  target,
  setTarget,
  setStart,
}) => {
  const [showGrid, setShowGrid] = useState(false);
  const [showCompare, setShowCompare] = useState(false);

  return (
    <div className="LandingPage">
      {showGrid ? (
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
          />
        </>
      ) : showCompare ? (
        <UI />
      ) : (
        <>
        <button onClick={() => {setShowGrid(true)}}>Play with algorithms</button>
        <button onClick={() => {setShowCompare(true)}}>Compare algorithms</button>
        </>
      )}
    </div>
  );
};

export default LandingPage;
