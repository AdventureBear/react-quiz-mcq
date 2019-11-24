import React from 'react'
import PropTypes from 'prop-types'


function QuestionReview(props) {
  return (
    <li className="questionsReview">
      <strong>{props.counter  + 1}</strong> {props.question}
    </li>
  )
}


QuestionReview.propTypes = {
  counter: PropTypes.number.isRequired,
  question: PropTypes.string.isRequired,
  correctAnswer: PropTypes.number.isRequired,
  selectedAnswer: PropTypes.number.isRequired,
  // handleQuestionReviewClick: PropTypes.func.isRequired

}


export default QuestionReview