import React from 'react'
import PropTypes from 'prop-types'
// import {CSSTransitionGroup} from 'react-transition-group'

function Controls (props) {
  if (props.studyMode) {
    return (
      <div className="controls">
        <button
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
          className='nav'
          onClick={props.handleNextQuestion}
        >
          Next
        </button>
      </div>
    )
  }

  return (
    <div className="controls">
      <button
        className='nav'
        onClick={props.handlePrevQuestion}
      >
        Prev

      </button>
      <button
        // disabled={true}
        className='nav'
        onClick={props.handleScore}
      >
        Score
      </button>
      <button
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
  handleReveal:       PropTypes.func.isRequired
}

export default Controls