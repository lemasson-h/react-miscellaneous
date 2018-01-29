import React, { Component } from 'react';

import Posts from '../Posts/Posts';
import NewPost from '../NewPost/NewPost';
import { Route, NavLink, Switch } from 'react-router-dom';
import './Blog.css';

class Blog extends Component {
    render () {
        return (
            <div className="Blog">
                <header>
                  <nav>
                    <ul>
                      <li><NavLink
                        to="/"
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
                  <Route path="/new-post" component={NewPost} />
                  <Route path="/" component={Posts} />
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
