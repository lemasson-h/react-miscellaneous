import React, { PureComponent } from 'react';
import Vote from './Vote';
import Winner from './Winner';

export default class Voting extends PureComponent {
  render() {
    return <div>
      {this.props.winner ?
        <Winner ref="winner" winner={this.props.winner} /> :
        <Vote pair={this.props.pair} hasVoted={this.props.hasVoted} vote={this.props.vote} />}
    </div>;
  }
};
