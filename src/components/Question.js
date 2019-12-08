import React from 'react'
import PropTypes from 'prop-types'
import { Header } from 'semantic-ui-react'

function Question (props)  {
  return (
   <div> <p>{props.content}</p></div>
  )
}

Question.propTypes = {
  content: PropTypes.string.isRequired
}

export default Question
