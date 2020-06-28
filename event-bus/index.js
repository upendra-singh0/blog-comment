const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const axios = require('axios');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cors());
app.use(morgan('dev'));

const events = [];

app.get('/events', (req, res) => {
  res.send(events);
});

app.post('/events', async (req, res) => {
  console.log('Received event ', req.body.type);

  const event = req.body;
  events.push(event);
  try {
    axios.post('http://localhost:4000/events', event);
    axios.post('http://localhost:4001/events', event);
    axios.post('http://localhost:4003/events', event);
  } catch (error) {
    console.log('Error:', error.message);
  }
  try {
    axios.post('http://localhost:4002/events', event);
  } catch (error) {
    console.log('Error:', error.message);
  }
  res.send({ status: 'OK' });
});

app.post('/', async (req, res) => {
  const eventDetail = req.body;
  console.log('event details', eventDetail);
  res.send({ status: 'OK' });
});

app.listen(4005, () => {
  console.log('Listening on port', 4005);
});
