import React, {Component} from 'react';
import axios from 'axios';

import InputQuestion from './InputQuestion';
import ListQuestion from './ListQuestions';

class ShowQuestion extends Component {

  state = {
    questions: []
  }

  componentDidMount(){
    this.getQuestions();
  }

  getQuestions = () => {
    axios.get('/api/questions')
      .then(res => {
        if(res.data){
          this.setState({
            questions: res.data
          })
        }
      })
      .catch(err => console.log(err))
  }

  deleteQuestion = (id) => {

    axios.delete(`/api/questions/${id}`)
      .then(res => {
        if(res.data){
          this.getQuestions()
        }
      })
      .catch(err => console.log(err))
  }

  render() {
    let { questions } = this.state;

    return(
      <div>
        <h1>Questions</h1>
        <InputQuestion getQuestions={this.getQuestions}/>
        <ListQuestion questions={questions} deleteQuestion={this.deleteQuestion}/>
      </div>
    )
  }
}

export default ShowQuestion;