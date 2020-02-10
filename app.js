const express = require('express');
const router = express.Router();
const fileDb = require('./fileDb');

router.get('', async  (req, res) => {
  const date = req.query.datetime;
  if (date) {

  } else {
    const items = await fileDb.getMessages();
    res.send(items);
  }

});

router.post('', async (req, res) => {

  if (Object.keys(req.body).length === 0) {
    console.info(req.body);
    res.status(400).send({
      'error': 'Some data is missing from a request!'
    })
  } else {
    await fileDb.addMessage(req.body);
    res.send(req.body)
  }
  console.log('request sent')
});

module.exports = router;
