import React from 'react'
import PropTypes from 'prop-types'

function Discussion (props) {
  if (props.studyMode) {
    if (props.reveal) {
      return (
        <div className='discussion'>
          <h3>You answered: </h3>
          <span>{props.choice.content}</span>
          <h3>This answer is {props.choice.correct.toString()}</h3>
          <p>{props.choice.discussion}</p>
        </div>
      )
    } else {
      return (
        <div className='discussion'><h3>Select an Option then Press "Reveal"</h3></div>
      )
    }
  } else {
    return (
      <div className='discussion'>

      </div>
      )

  }
}
Discussion.propTypes ={
  choice: PropTypes.object.isRequired,
  reveal: PropTypes.bool.isRequired
}
export default Discussion