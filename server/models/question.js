const mongoose = require('mongoose')
const Schema = mongoose.Schema

//create schema for question
const questionSchema = new Schema ({
  question: {
    type: String,
    required: [true, 'The question field is required']
  }
})


//create model for todo
const Question = mongoose.model( 'question', questionSchema)

module.exports = Question
