import React from 'react';

const validationComponent = (props) => {
  let validation = <p>
    Text long enough
  </p>;

  if (props.inputSize < 5) {
    validation = <p>
      Text too short
    </p>;
  }
  return <div>
    {validation}
  </div>;
}

export default validationComponent;
