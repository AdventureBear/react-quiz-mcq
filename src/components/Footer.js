import React from 'react'
import PropTypes from 'prop-types'


function Footer (props) {
  return (
    <div className='footer'>
          <div className='footer-nav'>
            <div className='footer-nav-container'>
              <div className='footer-nav-group-header'>
                 References
               </div>
              <a className="footer-nav-link" href="https://www.emra.org/globalassets/files/2016-em-model.pdf">EM Model</a> <br />
              <a className="footer-nav-link" href="https://www.cordem.org/resources/education--curricula/model-curriculum/appendix-c/">CORD EM Goals & Objectives</a><br />
              <a className="footer-nav-link" href="https://www.emra.org/">EMRA</a><br />
              <a className="footer-nav-link" href="https://jetem.org/multiple_choice_didactic/">JETem MCQ Training</a><br />

            </div>

            <div className='footer-nav-container'>
              <div className='footer-nav-group-header'>
                Legal Notices
              </div>
              <a className="footer-nav-link" href="">Privacy Policy</a> <br />
              <a className="footer-nav-link" href="">Terms & Conditions</a><br />
              <a className="footer-nav-link" href="">Disclaimer</a><br />
            </div>
          </div>


          <section className='footer-about'>
            <i className="fas fa-stethoscope fa-2x"/>
            <h3>EMQuick Board Review</h3>
            <p>Copyright © 2019 EMQuick</p>
          </section>
    </div>
  )
}


export default Footer

PropTypes.footer = {

}