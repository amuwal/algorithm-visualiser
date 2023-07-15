import { str, getAdjacent } from "./bfs"

const dfs = (start, target, rows, cols, idPrefix) => {
    const [r, c] = start;
    const queue = [], memo = {};
    let bestPath = null;
    const visited = new Set();

    const safe = (r, c) => {
        if (!(r >= 0 && r < rows && c >= 0 && c < cols)) return false;
        const cell = document.getElementById(idPrefix + str([r, c]));
        if (!cell) return
        return !(cell.classList.contains("wall"))
    };

    const helper = (r, c, path) => {
        path.push([r, c])

        const cur = str([r, c]);
        if (cur in memo && memo[cur] <= path.length) return;

        if (r === target[0] && c === target[1]) {
            if (bestPath === null || path.length < bestPath.length){
                bestPath = [...path];
            }
        }

        memo[cur] = path.length;
        if (!visited.has(cur)) queue.push([r, c]);
        visited.add(cur);
        for (const [x, y] of getAdjacent(r, c)){
            if (safe(x, y)){
                helper(x, y, [...path]);
            }
        }
    }
    const startTime = Date.now();
    helper(r, c, []);
    const finishTime = Date.now();
    return [queue, bestPath, finishTime - startTime];
}

export default dfs;