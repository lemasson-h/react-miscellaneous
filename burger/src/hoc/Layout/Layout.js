import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Aux from '../Aux/Aux';
import classes from './Layout.css';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

class Layout extends Component {
  state = {
      showSideDrawer: false
  };

  closeSideDrawerHandler = () => {
    this.setState({
      showSideDrawer: false,
    });
  };

  toggleSideDrawerHandler = () => {
    this.setState(
      (prevState) => {
        return { showSideDrawer: !prevState.showSideDrawer };
      }
    );
  };

  render () {
    return (
      <Aux>
        <Toolbar toggleSideDrawer={this.toggleSideDrawerHandler}
          isAuthenticated={this.props.isAuthenticated}/>
        <SideDrawer
          show={this.state.showSideDrawer}
          closeSideDrawer={this.closeSideDrawerHandler}
          isAuthenticated={this.props.isAuthenticated}/>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
}

export default withRouter(connect(mapStateToProps)(Layout));
