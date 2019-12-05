import React from 'react'
import PropTypes from 'prop-types'
import AnswerSelection from './AnswerSelection'
import iconCheck from '../svg/icon-check.svg'
import iconX from '../svg/icon-x.svg'

class QuestionReview extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showAnswer: false
    }
  }

  handleAnswerToggle = () => {
    this.setState({
      showAnswer: !this.state.showAnswer
    })
  }


  render () {
    let answers = null

    const icon = (this.props.correctAnswer===this.props.selectedAnswer ? iconCheck  : iconX)
    const className = (this.props.correctAnswer===this.props.selectedAnswer ? "answerIcon iconCheck"  : "answerIcon iconX")

    if (this.state.showAnswer) {
      answers =
        (
          <AnswerSelection
            fullQuestion = {this.props.fullQuestion}
            correctAnswer={this.props.correctAnswer}
            selectedAnswer={this.props.selectedAnswer}
          />
        )
    }

    return (
      <div>
        <div className="questionsReview"
             onClick={this.handleAnswerToggle}>
          <img className={className} src={icon} alt="icon"/>
          <strong>{this.props.counter + 1}</strong> {this.props.question}
        </div>
        {answers}
      </div>
    )
  }
}

QuestionReview.propTypes = {
  counter:            PropTypes.number.isRequired,
  question:           PropTypes.string.isRequired,
  correctAnswer:      PropTypes.number.isRequired,
  selectedAnswer:     PropTypes.number.isRequired,
  fullQuestion: PropTypes.object.isRequired
}


export default QuestionReview