import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../store/actions';
import AxiosOrder from '../../AxiosOrder';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

class Orders extends Component {
  componentDidMount() {
    this.props.onLoadOrders(this.props.userToken, this.props.userId);
  }

  render() {
    let orders = <Spinner />

    if (!this.props.loading) {
      orders = this.props.orders.map(order => {
          return <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}/>
      });
    }

    return (
      <div>
        {orders}
      </div>);
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    userToken: state.auth.token,
    userId: state.auth.userId,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onLoadOrders: (userToken, userId) => dispatch(actionCreators.loadOrders(userToken, userId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, AxiosOrder));
