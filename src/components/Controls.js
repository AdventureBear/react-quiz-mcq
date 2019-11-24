import React from 'react'
import PropTypes from 'prop-types'
// import {CSSTransitionGroup} from 'react-transition-group'

function Controls (props) {
  if (props.studyMode) {
    //STUDY MODE
    return (
      <div className="controls">
        <button
          disabled={!props.showPrevButton}
          className='nav'
          onClick={props.handlePrevQuestion}
        >
          Prev

        </button>

        <button
        disabled={!props.optionSelected}
        className='nav'
        onClick={props.handleReveal}
      >
        Reveal
      </button>

        <button
          disabled={!props.unanswered}
          className='nav'
          onClick={props.handleReview}
        >
          Show Skipped
        </button>

        <button
          disabled={!props.showNextButton}
          className='nav'
          onClick={props.handleNextQuestion}
        >
          Next
        </button>
      </div>
    )
  }

  //TESTING MODE
  return (
    <div className="controls">
      <button
        disabled={!props.showPrevButton}
        className='nav'
        onClick={props.handlePrevQuestion}
      >
        Prev
      </button>
      <button
        disabled={props.unanswered}
        className='nav'
        onClick={props.handleScore}
      >
        Score
      </button>
      <button
        disabled={!props.unanswered}
        className='nav'
        onClick={props.handleReview}
      >
        Show Skipped
      </button>
      <button
        disabled={!props.showNextButton}
        className='nav'
        onClick={props.handleNextQuestion}
      >
        Next
      </button>
    </div>
  )
}

Controls.propTypes = {
  studyMode:  PropTypes.bool.isRequired,
  optionSelected:     PropTypes.bool.isRequired,
  handlePrevQuestion: PropTypes.func.isRequired,
  handleNextQuestion: PropTypes.func.isRequired,
  handleReveal:       PropTypes.func.isRequired,
  handleReview: PropTypes.func.isRequired,
  unanswered: PropTypes.bool.isRequired,
  showPrevButton: PropTypes.bool.isRequired,
  showNextButton: PropTypes.bool.isRequired
}

export default Controls