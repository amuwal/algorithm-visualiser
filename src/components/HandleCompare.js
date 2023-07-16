import { useState } from "react"
import Compare from "./Compare"

const HandleCompare = ({speed, handleSpeedLevel, setView}) => {
    const presets = [
        {   
            start: "0-0",
            target: "9-9",
            rows: 10,
            cols: 10,
            walls:  new Set(
                    ['0-2', '1-1', '1-2', '1-4', '2-4', '2-6', 
                     '2-7', '3-4', '3-9', '4-1', '4-2', '4-6', 
                     '4-7', '4-9', '5-3', '5-6', '6-2', '6-4', 
                     '6-8', '6-9', '7-2', '7-4', '7-5', '7-6', 
                     '7-8', '9-3', '9-4', '9-5', '9-8']
                     )
        },
        {
            start: "0-0",
            target: "14-14",
            rows: 15,
            cols: 15,
            walls: new Set(
                   ['0-1', '0-2', '0-3', '0-4', '0-5', '0-6',
                    '0-7', '0-8', '0-9', '0-10', '0-11', '0-12',
                    '0-13', '0-14', '1-8', '1-14', '2-2', '2-3', '2-4',
                    '2-5', '2-6', '2-11', '2-14', '3-1', '3-9',
                    '3-12', '3-14', '4-0', '4-3', '4-4', '4-5',
                    '4-6', '4-9', '4-14', '5-0', '5-5', '5-7', '5-9',
                    '5-11', '5-12', '6-0', '6-2', '6-3', '6-5',
                    '6-13', '6-14', '7-0', '7-8', '7-10', '7-13',
                    '8-1', '8-3', '8-4', '8-5', '8-6', '8-10',
                    '9-1', '9-8', '10-0', '10-3', '10-5', '10-9',
                    '10-10', '10-11', '10-12', '10-13', '11-0',
                    '11-6', '11-7', '11-8', '11-10', '11-12',
                    '11-13', '11-14', '12-0', '12-10', '12-12',
                    '13-0', '13-2', '13-3', '13-4', '13-5',
                    '13-12', '13-13', '14-0', '14-4', '14-5',
                    '14-6', '14-7', '14-8'])
        }
    ]
    const [curPreset, setCurPreset] = useState(0);


    if (curPreset === 0) {
        return <Compare {...presets[0]} setView={setView} speed={speed} handleSpeedLevel={handleSpeedLevel} setCurPreset={setCurPreset} curPreset={curPreset} />
    } else if (curPreset === 1) {
        return <Compare {...presets[1]} setView={setView} speed={speed} handleSpeedLevel={handleSpeedLevel} setCurPreset={setCurPreset} curPreset={curPreset} />
    } else if (curPreset === 2) {
        return <Compare {...presets[2]} setView={setView} speed={speed} handleSpeedLevel={handleSpeedLevel} setCurPreset={setCurPreset} curPreset={curPreset}/> 
    }        
}
export default HandleCompare;