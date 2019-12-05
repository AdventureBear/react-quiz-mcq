import React from 'react'
import PropTypes from 'prop-types'
import Toggle from 'react-toggle'

function Header (props) {
  const mode = (props.studyMode ? "Study Mode" : "Test Mode" )
  return (
    <div className="header">
          <div className='header-logo'>
            <i className="fas fa-stethoscope fa-1x"/>

            <span className='title'>EMQuick</span>
          </div>

          <div className='navbar'>
            <a className="nav-item" href="/docs/getting-started.html">
              About
            </a>

            <a className="nav-item selected" href="/docs/getting-started.html">
              Study
              <span className="breadcrumb"></span>
            </a>


            <a className="nav-item" href="/docs/getting-started.html">
              Test
            </a>
          </div>

          <div className='toggle'>
            <label>
              <Toggle
                defaultChecked={props.studyMode}
                icons={false}
                onChange={props.handleStudyModeChange} />
              <span className='toggle-label'>{mode}</span>
            </label>
          </div>
    </div>
  )
}

export default Header

Header.propTypes = {
  studyMode: PropTypes.bool.isRequired,
  handleStudyModeChange: PropTypes.func.isRequired
}
