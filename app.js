const express = require('express');
const router = express.Router();
const fileDb = require('./fileDb');

router.get('', async  (req, res) => {
  const date = req.query.datetime;

  if (date) {
    const dateToCheck = new Date(date);
    if (!isNaN(dateToCheck.getDate())) {
      const items = await fileDb.getMessagesByDate(date);
      res.send(items);
    } else {
      res.status(400).send({
        'error': 'Incorrect datetime format!'
      })
    }

  } else {
    const items = await fileDb.getMessages();
    res.send(items);
  }

});

router.post('', async (req, res) => {

  if (!req.body.author || ! req.body.message) {
    res.status(400).send({
      error: 'Some data is missing from a request!'
    })
  } else {
    await fileDb.addMessage(req.body);
    res.send(req.body)
  }
});

module.exports = router;
