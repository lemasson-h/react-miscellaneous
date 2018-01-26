import React, {Component} from 'react';

import Aux from '../Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
      state = {
        error: null,
        requestInterceptor: null,
        responseInterceptor: null,
      }

      componentWillMount() {
        this.requestInterceptor = axios.interceptors.request.use(reqConfig => {
          this.setState({error: null});

          return reqConfig;
        });


        this.responseInterceptor =  axios.interceptors.response.use(
          res => res,
          error => {
            this.setState({error: error});
          }
        );
      }

      componentWillUnmount() {
        //This comment was a check to make sure they are set and we pass here
        // console.log('Will Unmount', this.requestInterceptor, this.responseInterceptor);
        axios.interceptors.request.eject(this.requestInterceptor);
        axios.interceptors.response.eject(this.responseInterceptor);
      }

      errorConfirmedHandler = () => {
        this.setState({error: null});
      }

      render () {
        return (
          <Aux>
            <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
              {this.state.error ? this.state.error.message : null}
            </Modal>
            <WrappedComponent {...this.props} />
          </Aux>
        );
      }
    }
};

export default withErrorHandler;
