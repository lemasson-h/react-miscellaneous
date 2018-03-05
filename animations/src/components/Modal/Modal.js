import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';

import './Modal.css';

const animationTiming = {
  enter: 400,
  exit: 1000,
}

/**
onEnter={() => console.log('onEnter')}
onEntering={() => console.log('onEntering')}
onEntered={() => console.log('onEntered')}
onExit={() => console.log('onExit')}
onExiting={() => console.log('onExiting')}
onExited={() => console.log('onExited')}
*/

const modal = (props) => {
  return (
    <CSSTransition
      in={props.show}
      mountOnEnter
      unmountOnExit
      classNames="fade-slide"
      timeout={animationTiming}>
        <div className="Modal">
          <h1>A Modal</h1>
          <button className="Button" onClick={props.closed}>Dismiss</button>
        </div>
    </CSSTransition>
  );
}

export default modal;
