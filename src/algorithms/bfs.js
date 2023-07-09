
const str = (coordinate) => {
    return `${coordinate[0]}-${coordinate[1]}`
}

const getAdjacent = (r, c) => {
    return [[r, c + 1], [r, c - 1], [r + 1, c], [r - 1, c]]
}

const bfs = (start, target, rows, cols) => {

    const safe = (r, c) => {
        if (!(r >= 0 && r < rows && c >= 0 && c < cols)) return false;
        const cell = document.getElementById(str([r, c]));
        return !(cell.classList.contains("wall"))
    };

    let state = [[start[0], start[1], [start]]], found = false;
    const seen = new Set();
    const stepByStepQueue = [];
    let bestPath = [];


    while (state.length){
        let nextState = []
        for (let i = 0; i < state.length; i++){
            const [r, c, path] = state[i];
            if (seen.has(str([r, c]))) continue;
            seen.add(str([r, c]));
            if (r === target[0] && c === target[1]){
                found = true;
                bestPath = [...path];
                break;
            }
            for (const [x, y] of getAdjacent(r, c)){
                if (safe(x, y) && !seen.has(str([x, y]))){
                    nextState.push([x, y, [...path, [x, y]]]);
                }
            }
        }
        stepByStepQueue.push(state);
        if (found) break;
        state = nextState;
    }
    return [stepByStepQueue, bestPath]
}

export default bfs;