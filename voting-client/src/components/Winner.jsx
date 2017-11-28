import React, {PureComponent} from 'react';

export default class Winner extends PureComponent {
    render() {
      return <div className="winner">
        Winner is {this.props.winner}!
      </div>;
    }
}
