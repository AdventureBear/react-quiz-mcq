import React from 'react'
import PropTypes from 'prop-types'


function References (props) {

  return (
    <div className='references'>
      <strong>Source/Author: </strong>{props.source}
      <p></p>
      <strong>References: </strong>
      <ol>
      {props.references.map ( (item) => {
        return (
          <li key={item}>{item}</li>
        )
      })
      }
      </ol>

    </div>
  )
}

References.propTypes = {
  source: PropTypes.string.isRequired,
  references: PropTypes.array.isRequired
}

export default References