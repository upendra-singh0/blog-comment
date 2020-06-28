const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cors());
app.use(morgan('dev'));

const posts = {};

const handleEvent = (type, data) => {
  if (type === 'PostCreated') {
    const { id, title, text } = data;

    posts[id] = { id, title, text, comments: [] };
  } else if (type === 'CommentCreated') {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    post.comments.push({ id, content, status });
  } else if (type === 'CommentUpdated') {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    const comment = post.comments.find((comment) => {
      return comment.id === id;
    });

    comment.status = status;
    comment.content = content;
  }
};

app.get('/posts', (req, res) => {
  //console.log(posts);
  res.send(posts);
});

app.post('/events', (req, res) => {
  console.log('Received event ', req.body.type);

  const { type, data } = req.body;
  handleEvent(type, data);
  res.send({ status: 'success' });
});

app.listen(4002, async () => {
  console.log('Listening on port', 4002);

  try {
    const res = await axios.get('http://localhost:4005/events');

    for (let event of res.data) {
      console.log('processing event', event.type);
      handleEvent(event.type, event.data);
    }
  } catch (error) {
    console.log('Error:', error.message);
  }
});
