import React from 'react'
import PropTypes from 'prop-types'
import { CSSTransitionGroup } from 'react-transition-group'
import QuestionReview from './QuestionReview'

function Result (props) {

  const renderQuestionReview =(question, i) =>{
    console.log(question)
    return (
      <QuestionReview
        key={question.question}
        counter={i}
        question={question.question}
        correctAnswer={props.answerKey[i]}
        selectedAnswer={props.selectedAnswers[i]}
        onClick={props.handleQuestionReviewClick}
      />
    )
  }


  return (
    <CSSTransitionGroup
      className="container"
      component="div"
      transitionName="fade"
      transitionEnterTimeout={800}
      transitionLeaveTimeout={500}
      transitionAppear
      transitionAppearTimeout={500}
    >
      <div>
        Your score is <strong>{props.quizScore} out of {props.quiz.length}</strong> or <strong>{parseInt(props.quizScore/props.quiz.length*100)} %</strong>

        <ul className='review'>
          {props.quiz.map(renderQuestionReview)}
        </ul>

      </div>

    </CSSTransitionGroup>
  )
}

Result.propTypes = {
  quiz: PropTypes.array.isRequired,
  answerKey: PropTypes.array.isRequired,
  selectedAnswers: PropTypes.array.isRequired,
  // handleQuestionReviewClick: PropTypes.func.isRequired,
  quizScore: PropTypes.number.isRequired
}

export default Result