import React, { Component } from 'react';
import PostCreate from './PostCreate';
import PostList from './PostList';

class App extends Component {
  render() {
    return (
      <div className="container">
        <h3>Post Create</h3>
        <PostCreate></PostCreate>
        <hr />
        <h3>Post List</h3>
        <PostList></PostList>
      </div>
    );
  }
}

export default App;
