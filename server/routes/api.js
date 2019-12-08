const express= require('express')
const router = express.Router()
const Question = require('../models/question')

router.get('/questions', (req,res, next) => {
//this will return all the data
  Question.find({}, 'question')
    .then(data => res.json(data))
    .catch(next)
})

router.post('/questions', (req,res,next) => {
  if(req.body.action){
    Question.create(req.body)
      .then(data => res.json(data))
      .catch(next)
  }else {
    res.json({
      error: "The input field is empty"
    })
  }
})

router.delete('/questions/:id', (req,res,next) => {
  Question.findOneAndDelete({"_id": req.params.id})
    .then(data => res.json(data))
    .catch(next)
})

module.exports = router