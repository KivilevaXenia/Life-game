import React, {useState} from 'react';
import './App.css';
import Table from './Table';
import Popup from "./Popup";

function App() {
    const [isLaunched, setLaunch] = useState(false);

    let buttonName = isLaunched? 'Stop' : 'Start';
    const [clear, setClear] = useState(false);
    const [length, setLength] = useState(4);
    const [width, setWidth] = useState(4);
    const [speed, setSpeed] = useState(500);
    const [visibility, setVisibility] = useState(true);

    return (
        <div className='App'>
            <div className='header'>Life Game</div>
            <div className='menu'>
                <div className='filter'>
                    <label>Choose size of the field:</label>
                    <div>
                        <input className='size' type='number' step='1' id='length' min='1' max='20' value={length} onChange={(e) => setLength(Number(e.target.value))}></input>
                        X
                        <input className='size' type='number' step='1' id='width' min='1' max='20' value={width} onChange={(e) => setWidth(Number(e.target.value))}></input>
                        <br></br>
                    </div>
                </div>
                <div className='filter'>
                    <label>Set speed (ms)</label>
                    <input className='speed' type='number' min='0' value={speed} onChange={(e) => setSpeed(Number(e.target.value))}></input>
                </div>

                <button onClick={() => setLaunch(!isLaunched)}>{buttonName}</button>
                <Popup btn={true} visibility={!isLaunched}>
                    Click 'Start' to see the magic!
                </Popup>
                <button onClick={() => setClear(true)}>Clear</button>
            </div>
            <div className='content'>
                <Popup visibility={visibility}>
                    Click on squares to fill them.
                </Popup>
                <Table id='table'
                    isLaunched={isLaunched}
                    isClear={clear}
                    setClear={() => setClear(false)}
                    length={length}
                    width={width}
                    speed={speed}
                    onClick={() => {
                        setVisibility(false)
                    }}
                />
            </div>
        </div>
    );
}

export default App;
