import React from 'react'
import PropTypes from 'prop-types'

function AnswerSelection (props) {
  // let correct = null
  // if (props.selectedAnswer===props.correctAnswer){
  //   const correct =  <p><b>The correct answer is:</b> {props.fullQuestion.answers[props.correctAnswer].content} </p>
  // }
  let correct  = props.fullQuestion.answers.find(element => element.id === props.correctAnswer)
  console.log ("Correct Answer:" , correct)

  let selected  = props.fullQuestion.answers.find(element => element.id === props.selectedAnswer)
  console.log ("Selected Answer:" , selected)
  return (
    <div className='answerSelection'>
      <p><b>You chose:</b> {selected.content}</p>
      {/*{correct}*/}
      <p><b>The correct answer is:</b> {correct.content} </p>
      <p><b>Discussion:</b> {correct.discussion}</p>
    </div>
  )
}

AnswerSelection.propTypes = {
  correctAnswer: PropTypes.number.isRequired,
  selectedAnswer: PropTypes.number.isRequired,
  fullQuestion: PropTypes.object.isRequired
}

export default AnswerSelection