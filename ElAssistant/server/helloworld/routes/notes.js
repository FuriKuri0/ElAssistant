var express = require('express');
var {getAllNotes,updateNote}= require('../api/index');

var router = express.Router();
/* GET users listing. */
router.get('/all', async(req, res, next) => {
  const data =await getAllNotes()
  res.json(data);
});
router.post('/update', async(req, res, next) => {
  const {key,newDetail} = req.body;
  const result = await updateNote(key,newDetail)
  res.send(result);
});

module.exports = router;
