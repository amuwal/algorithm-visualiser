import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "../styles/Grid.css"
import bfs from "../algorithms/bfs";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

const Grid = () => {
    console.log("render")
    const initialStart = "0-0";
    const initialTarget = "4-9";

    let mousedown = false;
    document.body.onmousedown = () => {mousedown = true}
    document.body.onmouseup = () => {mousedown = false}
    document.body.ondrop = () =>{mousedown=false}


    useEffect(() => {
        console.log("useeffect")
        if (!document.getElementById("entry")){
            const m = 5, n = 10;
            const grid = document.getElementById("grid");
            for (let r = 0; r < m; r ++){
                for (let c = 0; c < n; c ++){
                    const cur = `${r}-${c}`;
                    const cell = document.createElement("div");
                    cell.key = cur;
                    cell.id = cur;
                    cell.classList.add("cell");
                    cell.ondragover = allowDrag;
                    cell.ondrop = drop;
                    cell.onmouseover = handleHover;
                    cell.onmousedown = handleHover;
                if (cur === initialStart){
                    const p = document.createElement("p")
                    p.id = "entry";
                    p.textContent = "entry";
                    p.draggable = "true";
                    p.ondragstart = drag;
                    cell.appendChild(p);
                } else if (cur === initialTarget){
                    const p = document.createElement("p")
                    p.id = "target";
                    p.textContent = "target";
                    p.draggable = "true";
                    p.ondragstart = drag;
                    cell.appendChild(p);
                }
                grid.appendChild(cell);
            }
        }
        }
    },);

    const handleHover = (e) => {
        const cell = e.target; 
        if (!e.target.classList.contains("cell")) return;
        if (e.type === "mouseover" && mousedown){
            cell.classList.add("wall");
        } else if (e.type === "mousedown"){
            cell.classList.toggle("wall")
        }
    }

    const allowDrag = (e) => {
        e.preventDefault();
    }

    const drag = (e) => {
        e.dataTransfer.setData("text", e.target.id);
        mousedown = false;
    }

    const drop = (e) => {
        e.preventDefault();
        if (!e.target.classList.contains("cell")) return
        const id = e.dataTransfer.getData("text");
        const element = document.getElementById(id)
        if (element === null) return;
        e.target.appendChild(element)
        const best = document.querySelector(".best-path")
        if (best){
            handleOnClick();
        }
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
     }

    const handleOnClick = async (e) => {
        resetGrid();
        const start = document.getElementById("entry").parentElement.id;
        const target = document.getElementById("target").parentElement.id;
        const s = start.split("-").map(x => +x)
        const t = target.split("-").map(x => +x)
        const [stepByStepQueue, bestPath] = bfs(s, t, 5, 10);
        for (const state of stepByStepQueue){
            await sleep(100);
            for (const [r, c] of state){
                const cell = document.getElementById(`${r}-${c}`);
                cell.classList.add("visited");
            }
        }
        for (const [r, c] of bestPath){
            await sleep(50);
            const cell = document.getElementById(`${r}-${c}`);
            cell.classList.add("best-path")
        }
    }

    const resetGrid = (e) => {
        for (let r = 0; r < 5; r ++){
            for (let c = 0; c < 10; c ++){
                const cell = document.getElementById(`${r}-${c}`)
                cell.classList.remove("visited");
                cell.classList.remove("best-path")
            }
        }
    }

    return (
        <>
        <button onClick={handleOnClick}>Start</button>
        <button onClick={resetGrid}>Reset</button>
        <div className="grid" id="grid" >
        </div>
        </>
    )
}

export default Grid;