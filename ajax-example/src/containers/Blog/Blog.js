import React, { Component } from 'react';

import asyncComponent from '../../hoc/asyncComponent';
import Posts from '../Posts/Posts';
// import NewPost from '../NewPost/NewPost';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import './Blog.css';

const AsyncNewPost = asyncComponent(() => {
  return import('../NewPost/NewPost');
});

class Blog extends Component {
    state = {
        auth: true,
    };

    render () {
        return (
            <div className="Blog">
                <header>
                  <nav>
                    <ul>
                      <li><NavLink
                        to="/posts"
                        exact
                        activeClassName="my-active"
                        activeStyle={{
                          color: '#fa923f',
                          textDecoration: 'underline',
                        }}>Posts</NavLink></li>
                      <li><NavLink to={{
                        pathname: '/new-post',
                        hash: '#submit',
                        search: '?quick-submit=true'
                      }} exact>New Post</NavLink></li>
                    </ul>
                  </nav>
                </header>
                <Switch>
                  {this.state.auth ? <Route path="/new-post" component={AsyncNewPost} /> : null }
                  <Route path="/posts" component={Posts} />
                  <Redirect from="/" exact to="/posts" />
                  <Route render={() => <h1>Not found</h1>} />
                  {/* <Route path="/" component={Posts} /> */}
                </Switch>
                {/* <Route path="/" render={() => <h1>Home</h1>}/>
                <Route path="/" exact render={() => <h1>Home 2</h1>}/> */}
                {/* <section>
                    <FullPost postId={this.state.fullPostId}/>
                </section>
                <section>
                    <NewPost />
                </section> */}
            </div>
        );
    }
}

export default Blog;
