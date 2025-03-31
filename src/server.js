const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
const PORT = 7171;

app.use(bodyParser.json());

app.use('/', routes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.listen(PORT, () => {
  console.log(`Key-Value Cache service running on port ${PORT}`);
});
