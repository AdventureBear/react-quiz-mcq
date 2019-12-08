import React, { Component } from 'react';
import axios from 'axios';


class InputQuestion extends Component {

  state = {
    question: ""
  }

  addQuestion = () => {
    const question = {question: this.state.question}
    console.log(question)

    if(question.question && question.question.length > 0){
      axios.post('/api/questions', question)
        .then(res => {
          if(res.data){
            this.props.getQuestions();
            this.setState({question: ""})
          }
        })
        .catch(err => console.log(err))
    }else {
      console.log('input field required')
    }
  }

  handleChange = (e) => {
    console.log(e.target.value)
    this.setState({
      question: e.target.value
    })
  }

  render() {
    let { question } = this.state.question;
    return (
      <div>
        <input type="text" onChange={this.handleChange} value={question} />
        <button onClick={this.addQuestion}>add question</button>
      </div>
    )
  }
}

export default InputQuestion