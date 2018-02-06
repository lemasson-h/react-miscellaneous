import React from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../../UI/Backdrop/Backdrop';
import classes from './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const sideDrawer = (props) => {
  const classesForSideDrawer = [classes.SideDrawer, (props.show ? classes.Open : classes.Close)].join(' ');

  return (
    <Aux>
      <Backdrop show={props.show} clickMethod={props.closeSideDrawer}/>
      <div className={classesForSideDrawer}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuthenticated} />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
