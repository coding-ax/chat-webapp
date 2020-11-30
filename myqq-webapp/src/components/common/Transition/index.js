import React from 'react'
import './test.css'
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
            <div style={{ position: "fixed", width: '100vw', height: '100vh', overflow: 'scroll', zIndex: 2, backgroundColor: '#fff' }}>
                {props.children}
            </div>
        </CSSTransition>
    )
}
export default React.memo(Transition)