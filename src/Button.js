import React, {useState, useEffect} from 'react';
import './Button.css';

export default function Button(props) {
    let index = props.index;
    let count = props.count;
    const [isFill, setFill] = useState(null);

    useEffect(() => {
        if (props.squares) {
            if(props.squares[index]) {
                setFill(props.squares[index][count-1]);
            }
        }
    }, [props.squares]);

    let className = isFill? 'fill' : '';

    return (
        <button className={`button ${className}`}
                onClick={() => {
                    props.onClick();
                }}
        ></button>
    )
}
