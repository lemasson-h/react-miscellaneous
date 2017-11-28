import React from 'react';
import './UserOutput.css';

const userOutput = (props) => {
  return (
    <div className="UserOutput">
      <p>Welcome on {props.username}'s page</p>
      <p>This is a second text</p>
    </div>
  );
};

export default userOutput;
