import React, { useState } from 'react';
import axios from 'axios';

function PostCreate() {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const onSubmitHandler = async (event) => {
    console.log('button clicked');
    event.preventDefault();

    try {
      const result = await axios.post('http://localhost:4000/posts', {
        title,
        text,
      });
      await console.log(result.data);
    } catch (error) {
      console.log(error);
    }
    setTitle('');
    setText('');
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <div className="form-group">
          <label>Title</label>
          <input
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          <br />
          <label>Description</label>
          <textarea
            className="form-control"
            rows="3"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default PostCreate;
