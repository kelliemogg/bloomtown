const express = require('express')
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hey! its my new application')
});

app.listen(port, () => {
  console.log(`my new application is here at the port ${port}!`)
});
