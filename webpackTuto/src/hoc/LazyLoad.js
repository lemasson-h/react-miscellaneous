import React, { Component } from 'react';

const lazyLoad = (loadComponent) => {
  return class extends Component {
    state = {
      component: null,
    };

    componentDidMount()
    {
      loadComponent().then(module => {
        this.setState({
          component: module.default,
        });
      });
    }

    render() {
      const Component = this.state.component;

      return Component ? <Component {...this.props} /> : null;
    }
  }
}

export default lazyLoad;
