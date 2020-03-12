import React, {useState, useEffect} from 'react';
import './Button.css';

export default function Button(props) {
    const [isFill, setFill] = useState(null);

    let index = props.index;
    let count = props.count;
    let className = isFill? 'fill' : '';


    useEffect(() => {
        if (props.squares) {
            if(props.squares[index]) {
                setFill(props.squares[index][count-1]);
            }
        }
    }, [props.squares]);

    return (
        <button className={`button ${className}`}
                onClick={() => {
                    props.onClick();
                }}
        ></button>
    )
}
