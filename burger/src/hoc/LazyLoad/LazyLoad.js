import React, { Component } from 'react';

const lazyLoad = (importComponent) => {
  return class extends Component {
    state = {
      component: null,
    }

    componentDidMount() {
      importComponent()
      .then(result => {
          this.setState({
            component: result.default,
          });
      })
    }

    render() {
      const LoadedComponent = this.state.component;

      return LoadedComponent ? <LoadedComponent {...this.props} /> : null;
    }
  }
}

export default lazyLoad;
