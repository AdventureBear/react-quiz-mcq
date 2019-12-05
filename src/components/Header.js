import React from 'react'
import PropTypes from 'prop-types'
import Toggle from 'react-toggle'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function Login() {
  return <span className="nav-item">Login</span>;
}

function Logout() {
  return <span className="nav-item">Logout</span>;
}

function Home() {
  return <span className="nav-item">Home</span>;
}

function Header (props) {
  const mode = (props.studyMode ? "Study Mode" : "Test Mode" )
  return (
   <Router>
    <div className="header">
      <span className="breadcrumb"></span>
          <div className='header-logo'>
            <Link className = "nav-item" to ="/">
            <i className="fas fa-stethoscope fa-1x"/>

            <span className='title'>EMQuick</span>
            </Link>
          </div>

          <div className='navbar'>
            <Link className = "nav-item" to ="/login">
              Login
            </Link>

            <Link className = "nav-item" to ="/logout">
              Logout
            </Link>
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
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
   </Router>
  )
}

export default Header

Header.propTypes = {
  studyMode: PropTypes.bool.isRequired,
  handleStudyModeChange: PropTypes.func.isRequired
}
