import React, {useState, useEffect, useLayoutEffect} from 'react';
import './Table.css';
import Button from "./Button";

export default function Table(props) {
    let initialSquares = [
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false],
    ];
    const [squares, setSquares] = useState(initialSquares);
    let isLaunched = props.isLaunched;
    let isClear = props.isClear;
    let setClear = props.setClear;
    let speed = props.speed;

    useEffect(() => {
        if (squares) {
            if (isClear) {
                let newSquares = [];
                for(let i = 0; i < squares.length; i++) {
                    newSquares[i] = [];
                    for (let j = 0; j < squares[i].length; j++) {
                        newSquares[i][j] = false;
                    }
                }
                setSquares(newSquares);
                setClear();
            }
        }
    }, [props.isClear]);

    function getSquares() {
        let newSquares = [];
        if (squares) {
            for (let i = 0; i < squares.length; i++) {
                newSquares[i] = squares[i].slice();
            }
        }

        return newSquares;
    }

    useEffect(() => {
        let result = getSquares();
        let length = props.length - result.length;
        let initRes = result[0] ? result[0].length : 0;
        let width = props.width - initRes;

        if (squares) {
            if (!squares.length) {
                setSquares([]);
            } else {
                if (length > 0) {
                    for (let i = 0; i < length; i++) {
                        result.push([]);
                        for (let i = 0; i < props.width; i++) {
                            result[result.length - 1].push(false);
                        }
                    }
                }
                if (length < 0) {
                    for (let i = squares.length; i > squares.length + length; i--) {
                        result.pop();
                    }
                }

                if (props.width > result[0].length) {
                    for (let j = 0; j < result.length; j++) {
                        for (let i = 0; i < width; i++) {
                            result[j].push(false);
                        }
                    }
                }
                if (props.width < result[0].length) {
                    for (let j = 0; j < result.length; j++) {
                        for (let i = result[j].length; i > result.length + width; i--) {
                            result[j].pop();
                        }
                    }
                }

                setSquares(result);
            }
        }
    }, [props.width, props.length]);

    useEffect(() => {
        if (squares) {
            let newSquares = getSquares();
            let id = setTimeout(() => {
                if(isLaunched) {
                    for (let i = 0; i < squares.length; i++) {
                        for (let j = 0; j < squares[i].length; j++) {
                            let neighbours = 0;
                            if (squares[i]) {
                                if (squares[i][j + 1]) {
                                    neighbours++;
                                }
                                if (squares[i][j - 1]) {
                                    neighbours++;
                                }
                            }
                            if (squares[i - 1]) {
                                if (squares[i - 1][j + 1]) {
                                    neighbours++;
                                }
                                if (squares[i - 1][j]) {
                                    neighbours++;
                                }
                                if (squares[i - 1][j - 1]) {
                                    neighbours++;
                                }
                            }
                            if (squares[i + 1]) {
                                if (squares[i + 1][j + 1]) {
                                    neighbours++;
                                }
                                if (squares[i + 1][j]) {
                                    neighbours++;
                                }
                                if (squares[i + 1][j - 1]) {
                                    neighbours++;
                                }
                            }

                            if (squares[i][j] && neighbours < 2 || neighbours > 3) {
                                newSquares[i][j] = false;
                            } else if (!squares[i][j] && neighbours === 3) {
                                newSquares[i][j] = true;
                            }
                        }
                    }
                    setSquares(newSquares);
                }
            }, speed);
            return () => clearTimeout(id);
        }
    });

    const changeSquare = (num, i) => {
        let change = squares.slice();
        change[i][num-1] = !change[i][num-1];
        setSquares(change);
    };

    let length = (length) => {
        let lengthArray = [];
        for (let i = 0; i < length; i++) {
            lengthArray.push(1);
        }
        return lengthArray;
    };

    let width = (width) => {
        let widthArray = [];
        for (let i = 0; i < width; i++) {
            widthArray.push(1);
        }
        return widthArray;
    };

    function renderRow(length) {
        let count = 0;
        return length.map((elem, index) => {
            return <div className='board-row' key={index}>
                {renderButton(width(props.width), count, index)}
            </div>
        });
    }

    function renderButton (width, count, index) {
        return width.map(function() {
            count++;
            let number = count+(index*props.width);
            return <Button onClick={
                                (function(count, index) {
                                    return function() {
                                        changeSquare(count, index);
                                        props.onClick()
                                    }
                                })(count, index)}
                           number={number}
                           count = {count}
                           index={index}
                           key={number}
                           squares={squares}
            />
        })
    }

    return (
        <div className='table'>
            {renderRow(length(props.length))}
        </div>
    )
}
