const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cors());
app.use(morgan('dev'));

app.post('/events', async (req, res) => {
  console.log('Received event ', req.body.type);

  const { type, data } = req.body;
  if (type === 'CommentCreated') {
    const status = data.content.includes('orange') ? 'rejected' : 'approved';
    const { id, content, postId } = data;

    try {
      await axios.post('http://localhost:4005/events', {
        type: 'CommentModerated',
        data: {
          id,
          content,
          status,
          postId,
        },
      });
    } catch (error) {
      console.log('Error:', error.message);
    }
  }

  res.send({ status: 'success' });
});

app.listen(4003, () => {
  console.log('Listening on port', 4003);
});
