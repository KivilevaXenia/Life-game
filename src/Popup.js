import React, {useState, useEffect} from 'react'
import './Popup.css'

export default function Popup(props) {
    const [isVisible, setVisible] = useState(true);

    useEffect(() => {
        if (props.visibility === false) {
            setVisible(false)
        }
    }, [props.visibility]);

    return (
        <div className={`popup ${isVisible? 'popup_visible' : ''} ${props.btn? 'popup_forbtn' : ''}`} onClick={() => setVisible(false)}>
            {props.children}
        </div>
    )
}