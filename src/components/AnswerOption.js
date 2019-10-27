import React from 'react'
import PropTypes from 'prop-types'

function AnswerOption (props) {
  return (
    <li className='answerOption'>
      <input
        type='radio'
        className='radioCustomButton'
        name='radioGroup'
        checked= {props.id === parseInt(props.answer)}
        id={props.id}
        value={props.id}
        // disabled = {props.answer}
        onChange={props.onAnswerSelected}
        />
      <label className='radioCustomLabel'
             htmlFor={props.id}>
        {props.answerContent}
      </label>
    </li>
  )
}

AnswerOption.propTypes = {
  id: PropTypes.number.isRequired,
  answerContent: PropTypes.string.isRequired,
  answer: PropTypes.string,
  onAnswerSelected: PropTypes.func.isRequired
}

export default AnswerOption