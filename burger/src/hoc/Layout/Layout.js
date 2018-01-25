import React, {Component} from 'react';

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
        <Toolbar toggleSideDrawer={this.toggleSideDrawerHandler}/>
        <SideDrawer
          show={this.state.showSideDrawer}
          closeSideDrawer={this.closeSideDrawerHandler}/>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    );
  }
}

export default Layout;
