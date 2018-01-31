import React, { Component } from 'react';

import AxiosOrder from '../../AxiosOrder';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

class Orders extends Component {
  state = {
      orders: [],
      loading: true,
  };

  componentDidMount() {
    AxiosOrder.get('/orders.json')
      .then(response => {
        const fetchedOrders = [];
          for (let key in response.data) {
            fetchedOrders.push({
              ...response.data[key],
              id: key,
            });
          }
          this.setState({
            loading: false,
            orders: fetchedOrders,
          });
          console.log(fetchedOrders);
      })
      .catch(err => {
        this.setState({loading: false});
      });
  }

  render() {
    const orders = this.state.orders.map(order => {
        return <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}/>
    });

    return (
      <div>
        {orders}
      </div>);
  }
}

export default withErrorHandler(Orders, AxiosOrder);
