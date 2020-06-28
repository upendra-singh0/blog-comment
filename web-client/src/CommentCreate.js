import React, { useState } from 'react';
import axios from 'axios';

function CommentCreate({ postId }) {
  const [content, setContent] = useState('');

  const onSubmitHandler = async (event) => {
    console.log('button clicked');
    event.preventDefault();

    try {
      const result = await axios.post(
        `http://localhost:4001/posts/${postId}/comments`,
        { content }
      );
      await console.log(result.data);
    } catch (error) {
      console.log(error);
    }
    setContent('');
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <div className="form-group">
          <label>
            <small>Add New Comment</small>
          </label>
          <input
            className="form-control"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></input>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CommentCreate;

// import React, { useState } from 'react';
// import axios from 'axios';

// function PostCreate() {
//   const [title, setTitle] = useState('');

//   const onSubmitHandler = async (event) => {
//     console.log('button clicked');
//     //event.preventDefault();

//     try {
//       const result = await axios.post('http://localhost:4000/posts', { title });
//       await console.log(result.data);
//     } catch (error) {
//       console.log(error);
//     }
//     setTitle('');
//   };

//   return (
//     <div>
//   <form onSubmit={onSubmitHandler}>
//     <div className="form-group">
//       <label>Title</label>
//       <input
//         className="form-control"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       ></input>
//     </div>
//     <button type="submit" className="btn btn-primary">
//       Submit
//     </button>
//   </form>
//     </div>
//   );
// }

// export default PostCreate;
