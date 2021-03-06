import React, {useState} from 'react';
import Table from './Table';
import Popup from "./Popup";
import './App.css';

export default function App() {
    const [isLaunched, setLaunch] = useState(false);
    const [clear, setClear] = useState(false);
    const [length, setLength] = useState(4);
    const [width, setWidth] = useState(4);
    const [speed, setSpeed] = useState(500);
    const [visibility, setVisibility] = useState(true);

    let buttonName = isLaunched? 'Stop' : 'Start';

    return (
        <div className='App'>
            <div className='header'>Life Game</div>

            <div className='menu'>
                <div className='filter'>
                    <label>Choose size of the field:</label>
                    <div>
                        <input className='size' type='number' step='1' min='1' max='20' value={length}
                               onChange={ (e) => setLength(Number(e.target.value)) }></input>
                        X
                        <input className='size' type='number' step='1' min='1' max='20' value={width}
                               onChange={ (e) => setWidth(Number(e.target.value)) }></input>
                    </div>
                </div>

                <div className='filter'>
                    <label>Set speed (ms)</label>
                    <input className='speed' type='number' min='0' value={speed}
                           onChange={ (e) => setSpeed(Number(e.target.value)) }></input>
                </div>

                <button onClick={ () => setLaunch(!isLaunched) }>{buttonName}</button>
                <button onClick={ () => setClear(true) }>Clear</button>
                <Popup button={true} visibility={!isLaunched}>
                    Click 'Start' to see the magic!
                </Popup>
            </div>

            <div className='content'>
                <Popup visibility={visibility}>
                    Click on squares to fill them.
                </Popup>
                <Table id='table'
                    isLaunched={isLaunched}
                    isClear={clear}
                    setClear={ () => setClear(false) }
                    length={length}
                    width={width}
                    speed={speed}
                    onClick={ () => {setVisibility(false) }}
                />
            </div>
        </div>
    );
}
