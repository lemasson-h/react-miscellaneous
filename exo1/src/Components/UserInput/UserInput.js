import React from 'react';

const userInput = (props) => {
    const style = {
        margin: '15px 0 15px 0'
    };

    return (
      <div style={style}>
        <input type="text" onChange={props.onChangeHandler} value={props.defaultValue}/>
      </div>
    );
};

export default userInput;
