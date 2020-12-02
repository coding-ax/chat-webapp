import React from 'react'
import './style.css'
import { CSSTransition } from 'react-transition-group'
const Transition = props => {
    const { show } = props;
    return (
        <CSSTransition
            in={show}
            timeout={300}
            classNames='showBox'
            unmountOnExit
        >
            <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, overflow: 'scroll', zIndex: 3, backgroundColor: '#fff' }}>
                {props.children}
            </div>
        </CSSTransition>
    )
}
export default React.memo(Transition)