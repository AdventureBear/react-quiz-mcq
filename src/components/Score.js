import React from 'react'
import PropTypes from 'prop-types'

function Score (props) {
  return (
    <div className='score'>
      Your Score is <span>{props.score}</span> out of <span>{props.quiz.length}<strong>, or  {(props.score/props.quiz.length*100)} %</strong></span>
    </div>
  )
}

Score.propTypes = {
  score: PropTypes.number.isRequired,
  quiz: PropTypes.array.isRequired
}

export default Score