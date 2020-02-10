const express = require('express');
const cors = require('cors');
const fileDb = require('./fileDb');
const messageServer = require('./app');

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

app.use('/messages', messageServer);

const run = async () => {
  await fileDb.init();

  app.listen(port, ()=> {
    console.log(`Server started on port ${port}`)
  });
};

run().catch(e => {
  console.error(e)
});