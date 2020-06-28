const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const axios = require('axios');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cors());
app.use(morgan('dev'));

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title, text } = req.body;

  posts[id] = {
    id,
    title,
    text,
  };

  try {
    await axios.post('http://localhost:4005/events', {
      type: 'PostCreated',
      data: {
        id,
        title,
        text,
      },
    });
  } catch (error) {
    console.log('Error:', error.message);
  }

  res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
  console.log('Received event ', req.body.type);

  res.send({ status: 'success' });
});

app.listen(4000, () => {
  console.log('Listening on port', 4000);
});
