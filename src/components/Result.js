import React from 'react'
import PropTypes from 'prop-types'
import { CSSTransitionGroup } from 'react-transition-group'
import QuestionReview from './QuestionReview'
import Score from './Score'

function Result (props) {

  const renderQuestionReview =(question, i) =>{
    console.log(question)
    return (
      <QuestionReview
        key={question.question}
        counter={i}
        question={question.question}
        fullQuestion ={question}
        // correctAnswer={question.answers[props.answerKey[i]].content}
        correctAnswer={props.answerKey[i]}
        // selectedAnswer={question.answers[props.selectedAnswers[i]].content}
        discussion = {question.answers[props.answerKey[i]].discussion}
        selectedAnswer={props.selectedAnswers[i]}
        showAnswer={props.showAnswer}
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
      <Score
        score={props.quizScore}
        quiz={props.quiz}
      />

        <ul className='review'>
          {props.quiz.map(renderQuestionReview)}
        </ul>

      </div>

    </CSSTransitionGroup>
  )
}

Result.propTypes = {
  showAnswer: PropTypes.bool.isRequired,
  handleAnswerReview: PropTypes.func.isRequired,
  quiz: PropTypes.array.isRequired,
  answerKey: PropTypes.array.isRequired,
  selectedAnswers: PropTypes.array.isRequired,
  quizScore: PropTypes.number.isRequired
}

export default Result