import Grid from "./Grid";
import Header from "./Header";

const LandingPage = ({
  handleSpeedLevel,
  handleDensityLevel,
  setView,
  rows,
  cols,
  speed,
  start,
  target,
  setStart,
  setTarget,
  handleDfsOnLvl5,
}) => {
    return (
        <div className="page">
          <Header
            handleDensityLevel={handleDensityLevel}
            handleSpeedLevel={handleSpeedLevel}
            setView={setView}
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
        </div>
    )
};

export default LandingPage;
