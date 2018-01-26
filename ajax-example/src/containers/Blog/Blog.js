import React, { Component } from 'react';

//import Axios from 'axios';
import Axios from '../../Axios';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
      posts: [],
      fullPostId: null,
      error: false,
    };

    clickPostHandler = (postId) => {
      this.setState({
        fullPostId: postId,
      });
    }

    componentDidMount() {
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
          this.setState({
            error: true
          })
        });
    }

    render () {
      let posts = <p style={{textAlign: 'center'}}>Something went wrong</p>

      if (!this.state.error) {
        posts = this.state.posts.map(post => {
          return <Post key={post.id}
            title={post.title}
            author={post.author}
            clickMethod={() => this.clickPostHandler(post.id)}/>
        });
      }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost postId={this.state.fullPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;
