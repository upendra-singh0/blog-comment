import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CommentList({ comments }) {
  // const [comments, setComments] = useState([]);
  // const [errorMsg, setErrorMsg] = useState('');

  // const fetchComments = async () => {
  //   try {
  //     const result = await axios.get(
  //       `http://localhost:4001/posts/${postId}/comments`
  //     );
  //     console.log(result.data);
  //     setComments(result.data);
  //   } catch (error) {
  //     setErrorMsg((error.message = 'server error'));
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchComments();
  // }, []);

  return (
    <div>
      <ul>
        {comments.length ? (
          comments.map((comment) => {
            let content;
            if (comment.status === 'approved') content = comment.content;
            else if (comment.status === 'pending')
              content = 'This comment is awaiting moderation';
            else if (comment.status === 'rejected')
              content = 'This comment has been rejected';

            return <li key={comment.id}>{content}</li>;
          })
        ) : (
          <div />
        )}
      </ul>
    </div>
  );
}

export default CommentList;
