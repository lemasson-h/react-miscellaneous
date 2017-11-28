import React from 'react';

const input = (props) => {
  return <div>
    <input type="text" onChange={props.changeHandler} value={props.currentValue} />
  </div>;
}

export default input;
