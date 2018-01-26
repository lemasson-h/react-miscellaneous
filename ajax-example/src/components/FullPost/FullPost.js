import React, { Component } from 'react';

import Axios from '../../Axios';
import './FullPost.css';

class FullPost extends Component {
    state = {
      fullPost: null,
    };

    componentDidUpdate() {
      if (this.props.postId
        && (
          !this.state.fullPost
          || this.state.fullPost.id !== this.props.postId
        )
      ) {
        Axios.get('/posts/' + this.props.postId)
          .then(response => {
            this.setState({
              fullPost: response.data
            })
          })
      }
    }

    deletePostHandler = () => {
      Axios.delete('/posts/' + this.props.postId)
        .then(response => {
          console.log(response);
        });
    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;

        if (this.props.postId) {
          post = <p style={{textAlign: 'center'}}>Loading...!</p>;
        }

        if (this.state.fullPost) {
          post = (
              <div className="FullPost">
                  <h1>{this.state.fullPost.title}</h1>
                  <p>{this.state.fullPost.body}</p>
                  <div className="Edit">
                      <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
                  </div>
              </div>

          );
        }
        return post;
    }
}

export default FullPost;
