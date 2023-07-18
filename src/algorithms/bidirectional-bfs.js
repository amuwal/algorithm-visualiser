import {str, getAdjacent} from "./bfs";

const bidirectionalBfs = (start, target, rows, cols, idPrefix="") => {
    const [r, c] = start;
    const [tr, tc] = target;

    const safe = (r, c) => {
        if (!(r >= 0 && r < rows && c >= 0 && c < cols)) return false;
        const cell = document.getElementById(idPrefix + str([r, c]));
        if (!cell) return ["was inturpted", "-1"]
        return !(cell.classList.contains("wall"))
    };

    const timeTaken = theRealBiBfs(start, target, rows, cols, safe); //  to get fair time taken 

    let state = [[r, c, [[r, c]], "start"], [tr, tc, [[tr, tc]], "target"]]
    const visitedByStart = {};
    const visitedByTarget = {};

    const stepByStepQueue = [];
    while (state.length){
        let nextState = [];
        for (let i = 0; i < state.length; i ++){
            const [r, c, path, direction] = state[i];
            const cur = str([r, c])
            if (direction === "start"){
                if (cur in visitedByStart) continue;
                if (cur in visitedByTarget) {
                    const bestPath = [[...path], [...visitedByTarget[cur]]];
                    stepByStepQueue.push(state.slice(0, i + 1));
                    return [stepByStepQueue, bestPath, timeTaken]
                }
                visitedByStart[cur] = [...path];
            } else {
                if (cur in visitedByTarget) continue;
                if (cur in visitedByStart){
                    const bestPath = [[...visitedByStart[cur]], [...path]];
                    stepByStepQueue.push(state.slice(0, i + 1));
                    return [stepByStepQueue, bestPath, timeTaken]
                }
                visitedByTarget[cur] = [...path];
            }
            for (const [x, y] of getAdjacent(r, c)){
                if (!safe(x, y)) continue;
                nextState.push([x, y, [...path, [x, y]], direction])
            }
        }
        stepByStepQueue.push(state);
        state = nextState;
    }

    // no path found
    return [stepByStepQueue, [[], []]]
}

const theRealBiBfs = (start, target, rows, cols, safe) => {
    const [r, c] = start;
    const [tr, tc] = target;
    let state = [[r, c, "start",], [tr, tc, "target"]];
    const visitedByStart = new Set();
    const visitedByTarget = new Set();
    const startTime = Date.now();

    while (state.length){
        let nextState = [];
        for (let i = 0; i < state.length; i ++){
            const [r, c, direction] = state[i];
            const cur = str([r, c])
            if (direction === "start"){
                if (cur in visitedByStart) continue;
                if (cur in visitedByTarget) {
                    return Date.now() - startTime;
                }
                visitedByStart[cur] = true;
            } else {
                if (cur in visitedByTarget) continue;
                if (cur in visitedByStart){
                    return Date.now() - startTime;
                }
                visitedByTarget[cur] = true;
            }
            for (const [x, y] of getAdjacent(r, c)){
                if (!safe(x, y)) continue;
                nextState.push([x, y, direction])
            }
        }
        state = nextState;
    }

}

export default bidirectionalBfs;