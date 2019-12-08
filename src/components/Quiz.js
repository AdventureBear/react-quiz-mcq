import React from 'react'
import PropTypes from 'prop-types'
import Question from './Question'
import QuestionCount from './QuestionCount'
import AnswerOption from './AnswerOption'
import Controls from './Controls'
import {CSSTransitionGroup} from 'react-transition-group'
import Discussion from './Discussion'
import References from './References'
import { Container, Header } from 'semantic-ui-react'

function Quiz (props)  {
  const renderAnswerOptions=(key) =>{
    return (
      <AnswerOption
        key={key.id}
        id={key.id}
        // answerType={key.type}
        answerContent={key.content}
        answer={props.answer}
        questionId={props.questionId}
        onAnswerSelected={props.onAnswerSelected}
      />
    )
  }
  const unanswered = ( props.unansweredQuestions.length > 0)
  console.log(props.unansweredQuestions.length, unanswered)
  return (

      <div  key={props.questionId}>
        <QuestionCount
          counter={props.questionId}
          total={props.questionTotal}
        />
        <CSSTransitionGroup
          className="questions"
          component="div"
          transitionName="fade"
          transitionEnterTimeout={800}
          transitionLeaveTimeout={500}
          transitionAppear
          transitionAppearTimeout={500}
        >
          <div className='questions'>
              <Question content={props.question}/>

              {/*//Answer Option*/}
              <ul className='answerOptions'>
                {props.answerOptions.map(renderAnswerOptions)}
              </ul>
          </div>
        </CSSTransitionGroup>
        <Controls
          studyMode = {props.studyMode}
          handlePrevQuestion = {props.handlePrevQuestion}
          handleNextQuestion = {props.handleNextQuestion}
          handleReveal = {props.handleReveal}
          handleScore = {props.handleScore}
          optionSelected={props.optionSelected}
          handleReview={props.handleReview}
          unanswered={(props.unansweredQuestions.length>0)}
          // unanswered={props.unanswered}
          showPrevButton={props.showPrevButton}
          showNextButton={props.showNextButton}
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

  )


}


Quiz.propTypes = {
  answer: PropTypes.number,
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
  references: PropTypes.array.isRequired,
  handleReview: PropTypes.func.isRequired,
  showPrevButton: PropTypes.bool.isRequired,
  showNextButton: PropTypes.bool.isRequired,
}

export default Quiz