import React from 'react'
import PropTypes from 'prop-types'
import Question from './Question'
import QuestionCount from './QuestionCount'
import AnswerOption from './AnswerOption'
import Controls from './Controls'
import {CSSTransitionGroup} from 'react-transition-group'
import Discussion from './Discussion'
import References from './References'

function Quiz (props)  {
  const renderAnswerOptions=(key) =>{
    return (
      <AnswerOption
        key={key.id}
        id={key.id}
        answerType={key.type}
        answerContent={key.content}
        answer={props.answer}
        questionId={props.questionId}
        onAnswerSelected={props.onAnswerSelected}
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
      <div key={props.questionId}>
        <QuestionCount
          counter={props.questionId}
          total={props.questionTotal}
        />

        <Question content={props.question}/>
        {console.log(props.selectedAnswers)}
        <ul className='answerOptions'>
          {props.answerOptions.map(renderAnswerOptions)}
        </ul>
        <Controls
          studyMode = {props.studyMode}
          handlePrevQuestion = {props.handlePrevQuestion}
          handleNextQuestion = {props.handleNextQuestion}
          handleReveal = {props.handleReveal}
          handleScore = {props.handleScore}
          optionSelected={props.optionSelected}
        />
        <Discussion
          studyMode = {props.studyMode}
          choice = {props.discussion}
          reveal = {props.reveal}
        />
        <References
          source = {props.source}
          references = {props.references}

        />


      </div>
    </CSSTransitionGroup>
  )


}


Quiz.propTypes = {
  answer: PropTypes.string,
  answerOptions: PropTypes.array.isRequired,
  question: PropTypes.string.isRequired,
  questionId: PropTypes.number.isRequired,
  questionTotal: PropTypes.number.isRequired,
  onAnswerSelected: PropTypes.func.isRequired,
  handlePrevQuestion: PropTypes.func.isRequired,
  handleNextQuestion: PropTypes.func.isRequired,
  handleReveal: PropTypes.func.isRequired,
  handleScore: PropTypes.func.isRequired,
  discussion: PropTypes.object.isRequired,
  reveal: PropTypes.bool.isRequired,
  source: PropTypes.string.isRequired,
  references: PropTypes.array.isRequired
}

export default Quiz