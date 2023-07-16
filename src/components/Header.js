import "../styles/Header.css";
const Header = ({ handleSpeedLevel, handleDensityLevel, setView }) => {
  return (
    <div className="header">
      <select defaultValue={"bfs"}>
        <option value="bfs">bfs</option>
        <option value="dfs">dfs</option>
        <option value="bidirectional-bfs">bidirectional-bfs</option>
        <option value="bfs">bfs</option>
      </select>

      <div className="levels-container">
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

      <div className="levels-container" id="density-levels">
        <legend>Density</legend>
        <div
          onClick={handleDensityLevel}
          className="levels level-active"
          id="density-1"
        ></div>
        <div
          onClick={handleDensityLevel}
          className="levels level-active"
          id="density-2"
        ></div>
        <div
          onClick={handleDensityLevel}
          className="levels"
          id="density-3"
        ></div>
        <div
          onClick={handleDensityLevel}
          className="levels"
          id="density-4"
        ></div>
        <div
          onClick={handleDensityLevel}
          className="levels"
          id="density-5"
        ></div>
      </div>

      <button
        id="goToCompareBtn"
        onClick={() => {
          setView("compare");
        }}
      >
        Compare algrithms
        <span>new</span>
      </button>
    </div>
  );
};

export default Header;
