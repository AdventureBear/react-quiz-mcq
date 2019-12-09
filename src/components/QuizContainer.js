import React from 'react'
import Header from './Header'
import ShowQuestion from './ShowQuestion'
import {Container} from 'semantic-ui-react'
import Footer from './Footer'
import PropTypes from 'prop-types'
import Quiz from './Quiz'
import quizQuestions from '../api/quizQuestions'
import Result from './Result'

class  QuizContainer extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div>
        {/*<Header*/}
        {/*  studyMode={this.props.studyMode}*/}
        {/*  handleStudyModeChange={this.props.handleStudyModeChange}*/}
        {/*/>*/}
        <Container text style={{marginTop: '3em'}}>
          {this.props.score >= 0 ? this.renderResult() : this.renderQuiz()}
        </Container>
        <Footer
          handleStudyModeChange={this.props.handleStudyModeChange}
        />
      </div>
    )
  }

  renderQuiz () {
    return (
      <Quiz
        unansweredQuestions={this.props.unansweredQuestions}
        answer={this.props.answer}
        answerOptions={this.props.answerOptions}
        questionId={this.props.counter+1}
        question={this.props.question}
        questionTotal={quizQuestions.length}
        onAnswerSelected={this.props.onAnswerSelected}
        handlePrevQuestion = {this.props.handlePrevQuestion}
        handleNextQuestion = {this.props.handleNextQuestion}
        handleReveal = {this.props.handleReveal}
        handleScore = {this.props.handleScore}
        discussion = {this.props.discussion}
        optionSelected = {this.props.optionSelected}
        reveal = {this.props.reveal}
        source = {this.props.source}
        references={this.props.references}
        studyMode = {this.props.studyMode}
        selectedAnswers = {this.props.selectedAnswers}
        handleReview = {this.props.handleReview}
        showPrevButton={this.props.showPrevButton}
        showNextButton={this.props.showNextButton}
      />


    )
  }

  renderResult () {
    return (
      <Result
        quiz={this.props.quiz}
        selectedAnswers={this.props.selectedAnswers}
        answerKey={this.props.answerKey}
        quizScore={this.props.score}
      />
    )
  }
}

QuizContainer.propTypes = {
  handleStudyModeChange: PropTypes.func.isRequired,
  studyMode: PropTypes.bool.isRequired,
  score: PropTypes.number.isRequired,



}
export default QuizContainer