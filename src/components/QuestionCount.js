import React from 'react'
import PropTypes from 'prop-types'
import { Header } from 'semantic-ui-react'

function QuestionCount (props) {
  return (
    <Header as="h1">
      Question <span>{props.counter}</span> of <span>{props.total}</span>
    </Header>
  )
}

QuestionCount.propTypes = {
  counter: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
}

export default QuestionCount