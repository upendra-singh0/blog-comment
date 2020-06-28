import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

function PostList() {
  const [posts, setPosts] = useState({});
  const [errorMsg, setErrorMsg] = useState('');

  const fetchpost = async () => {
    try {
      const result = await axios.get('http://localhost:4002/posts');
      console.log(result.data);
      setPosts(result.data);
    } catch (error) {
      setErrorMsg((error.message = 'server error'));
      console.log(error);
    }
  };

  useEffect(() => {
    fetchpost();
  }, []);

  const renderedPosts = Object.values(posts);
  console.log('posts', posts, 'rendered post', renderedPosts);

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts.length ? (
        renderedPosts.map((renderedPost) => (
          <div
            className="card"
            style={{ width: '30%', marginBottom: '20px' }}
            key={renderedPost.id}
          >
            <div className="card-body">
              <h3>{renderedPost.title}</h3>
              <p>{renderedPost.text}</p>
              {/* <CommentList postId={renderedPost.id}></CommentList> */}
              <CommentList comments={renderedPost.comments}></CommentList>
              <CommentCreate postId={renderedPost.id}></CommentCreate>
            </div>
          </div>
        ))
      ) : (
        <div>Message {errorMsg || 'no post available'}</div>
      )}
    </div>
  );
}

export default PostList;
