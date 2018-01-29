import React, { Component } from 'react';

import Axios from '../../Axios';
import FullPost from '../FullPost/FullPost';
import Post from '../../components/Post/Post';
import { Route } from 'react-router-dom';
import './Posts.css';

class Posts extends Component {
  state = {
    posts: [],
    // error: false,
  };

  clickPostHandler = (postId) => {
    // this.props.history.push('/' + postId);
    this.props.history.push({
      pathname: '/posts/' + postId
    });
  }

  componentWillMount() {
    console.log(this.props);
    Axios.get('/posts')
      .then(response => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map(post => {
          return {
            ...post,
            author: 'Max'
          }
        })

        this.setState({
          posts: updatedPosts
        })
      })
      .catch(error => {
        // this.setState({
        //   error: true
        // })
      });
  }

  render () {
    let posts = <p style={{textAlign: 'center'}}>Something went wrong</p>

    if (!this.state.error) {
      posts = this.state.posts.map(post => {
        return (
          // <Link to={'/' + post.id} key={post.id}>
            <Post
              key={post.id}
              title={post.title}
              author={post.author}
              clickMethod={() => this.clickPostHandler(post.id)}/>
          // </Link>
        );
      });
    }

    return (
      <div>
        <section className="Posts">
          {posts}
        </section>
        <Route path={this.props.match.url + '/:postId'} exact component={FullPost} />
      </div>
    );
  }
}

export default Posts;
