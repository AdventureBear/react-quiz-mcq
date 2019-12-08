import React from 'react'
import PropTypes from 'prop-types'
import Toggle from 'react-toggle'
import { Container, Menu, Radio } from 'semantic-ui-react'

function Header (props) {
  const mode = (props.studyMode ? "Study Mode" : "Test Mode" )
  return (
    <Container>
    <Menu fixed='top' inverted>
      <Container>
          <Menu.Item as="a" header>
            <i className="fas fa-stethoscope fa-1x"/>
            <span className='title'>EMQuick</span>
        </Menu.Item>
        <Menu.Item as='a'>Home</Menu.Item>
        <Menu.Menu inverted position="right">
          <Menu.Item as="a">Login</Menu.Item>
          <Menu.Item as="a">Sign Up</Menu.Item>
          <Menu.Item as="a">Logout</Menu.Item>
        </Menu.Menu>


      </Container>

    </Menu>
    <Menu position="right">

    {/*<label>*/}
  {/*  <Toggle*/}
  {/*    defaultChecked={props.studyMode}*/}
  {/*    icons={false}*/}
  {/*    onChange={props.handleStudyModeChange} />*/}
  {/*  <span className='toggle-label'>{mode}</span>*/}
  {/*</label>*/}

  <Menu.Item style={{ marginTop: '1.5em' }}>
    <Radio onChange={props.handleStudyModeChange}
           toggle inverse
           label={mode}
    />
  </Menu.Item>

  </Menu>
</Container>
  )
}

export default Header

Header.propTypes = {
  studyMode: PropTypes.bool.isRequired,
  handleStudyModeChange: PropTypes.func.isRequired
}
