import React from 'react'
// import logo from './svg/logo.svg';
import './index.css'
import './App.css'
import './toggle.css'
import '@fortawesome/fontawesome-free/css/all.css'
import quizQuestions from './api/quizQuestions'
import Quiz from './components/Quiz'
import Result from './components/Result'
import Toggle from 'react-toggle'


// const findUnanswered = (state) => ({
//     unanswered: state.selectedAnswers.map((answer, i) => {
//     if (answer === 0 ) {
//       return i
//     }
//     else {
//       return undefined
//     }
//   }).filter(el => {
//     return el !== undefined
//   })
//
// })


class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      quiz: quizQuestions,
      counter:       0,
      selectedAnswers: new Array(quizQuestions.length).fill(0),
      unansweredQuestions: [],
      answerKey: [],
      answersCount:  {},
      result:        '',
      gui: {
        showPrev: true,
        showNext: true
      },
      behavior: {
        reveal: false,
        studyMode: true,
        optionSelected: false,
      },
      discussion: {
        correct: false,
        discussion: "",
        label: ""
      },
      score: -1
    }



    this.handleAnswerSelected = this.handleAnswerSelected.bind(this)
    this.handlePrevQuestion = this.handlePrevQuestion.bind(this)
    this.handleNextQuestion = this.handleNextQuestion.bind(this)
    this.handleReveal = this.handleReveal.bind(this)
    // this.setOptionSelected = this.setOptionSelected.bind(this)
    this.handleStudyModeChange = this.handleStudyModeChange.bind(this)
    this.handleScore = this.handleScore.bind(this)
    this.createAnswerKey = this.createAnswerKey.bind(this)
    this.checkUnanswered = this.checkUnanswered.bind(this)
    this.handleReview = this.handleReview.bind(this)
    this.setNextPrevButtons = this.setNextPrevButtons.bind(this)
  }

  componentDidMount () {
    const shuffledAnswerOptions = quizQuestions.map((question) =>
      App.shuffleArray(question.answers)
    )

    console.log(shuffledAnswerOptions)

    this.setState({
      quizQuestions: shuffledAnswerOptions
    })
    this.checkUnanswered()
    this.createAnswerKey()
    this.setNextPrevButtons()
  }

  static shuffleArray (array) {
    let currentIndex = array.length, temporaryValue, randomIndex

    //while there remain elements to shuffle
    while (0 !== currentIndex) {

      //pick a remaining element
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1;

      //and swap it with the current element
      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }

    return array
  }

  handleAnswerSelected (event) {
    //this hides the answer when scrolling back through previously answered
    let selectedAnswers = this.state.selectedAnswers
    if (this.state.selectedAnswers[this.state.counter]) {

      this.setState(prevState => ({
        behavior: {                   // object that we want to update
          ...prevState.behavior,    // keep all other key-value pairs
          reveal: false       // update the value of specific key
        }
      }))
    }

    //set selected answer based on answer's index
    selectedAnswers[this.state.counter] = parseInt(event.currentTarget.value)
    this.setState(prevState => ( {
      selectedAnswers: selectedAnswers,
      behavior: {
        ...prevState.behavior,
          reveal: false,
          optionSelected: true
      }
    }))

    this.checkUnanswered()
  }

  // setOptionSelected () {
  //   // keeps previously answered questions checked when scrolling
  //   if (this.state.selectedAnswers[this.state.counter]) {
  //     this.setState(prevState => ({
  //       behavior: {
  //         ...prevState.behavior,
  //         optionSelected: true
  //       }
  //     }))
  //   } else {
  //     this.setState(prevState => ({
  //       behavior: {
  //         ...prevState.behavior,
  //         optionSelected: false
  //       }
  //     }))
  //   }
  // }

  handlePrevQuestion () {
    this.handleUpdate(-1)
    // this.checkUnanswered()
    // this.setState(decrementCounter)
    // this.setOptionSelected()
    // this.setNextQuestion()
    // this.setNextPrevButtons()
  }

  handleNextQuestion () {
    this.handleUpdate(1)
    // this.checkUnanswered()
    // this.setState(incrementCounter)
    // this.setOptionSelected()
    // this.setNextQuestion()
    // this.setNextPrevButtons()
  }

  handleUpdate (increment) {
    // const unansweredQuestions = findUnanswered(this.state)
    // const unansweredQuestions = this.state.selectedAnswers.map((answer, i) => {
    //   console.log("answer", i,":", answer)
    //   if (answer === 0 ) {
    //     return i
    //   }
    //   else {
    //     return undefined
    //   }
    // }).filter(el => {
    //   return el !== undefined
    // })
    // console.log(unansweredQuestions)
    const counter = this.state.counter + increment
    const showPrev = counter !== 0;
    const showNext = counter !== quizQuestions.length - 1;
    const optionSelected = (this.state.selectedAnswers[counter]>0)

    this.setState(prevState => ({
          optionSelected,
          counter,
          gui:        {
            showPrev,
            showNext
          },
          // unansweredQuestions,
          behavior:   {
            ...prevState.behavior,
            optionSelected: optionSelected,
            reveal: false
          },
          discussion: {
            correct:    false,
            discussion: "",
            label:      ""
          }
        }
      )
    )
  }

  createAnswerKey () {
    const answerKey = quizQuestions.map((question) => {
      return question.answers.find((answer) => answer.correct === true).id;
    })

      this.setState({
      answerKey
      })
  }

  handleReveal () {
    if (!this.state.behavior.reveal) {
      let choice = quizQuestions[this.state.counter].answers.filter(
        option => option.id === parseInt(this.state.selectedAnswers[this.state.counter])
      )

      this.setState(prevState => ({
        behavior:   {
          ...prevState.behavior,
          reveal: true
        },
        discussion: {
          correct:    choice[0].correct,
          discussion: choice[0].discussion,
          label:      choice[0].content
        }
      }))
    } else {
      this.setState(prevState => ({
        behavior:   {
          ...prevState.behavior,
          reveal: false
        }
    }))
    }
  }

  checkUnanswered () {
    let unansweredQuestions = this.state.selectedAnswers.map((answer, i) => {
      console.log("answer", i,":", answer)
      if (answer === 0 ) {
        return i
      }
      else {
        return undefined
      }
    }).filter(el => {
      return el !== undefined
    })
    console.log("Unanswered Questions", unansweredQuestions)

    this.setState({
      unansweredQuestions: unansweredQuestions,
    })
  }

  handleScore () {
      console.log("Scoring your test")
      let score = this.state.selectedAnswers.reduce((totalScore, answer, i) => {
          console.log("Answer " + i + " = " + answer)
          if (answer === this.state.answerKey[i]) {
            console.log("answer correct")
            totalScore++
          } else {
            console.log("answer incorrect")
          }
          return totalScore
        }, 0
      )

      this.setState({score})
  }


  setNextPrevButtons (){
    this.setState(({ counter }) => {
      const showPrev = counter !== 0;
      const showNext = counter !== quizQuestions.length - 1;
      return { gui: { showPrev, showNext } };
    });
  }

  handleStudyModeChange() {
    const studyMode = this.state.behavior.studyMode
    this.setState(prevState => ({
      behavior: {
        ...prevState.behavior,
        studyMode: !studyMode
      }
    }))
  }

  handleReview () {
    //grab first question ID & pass that to quiz by updating counter &
    //setting state to rerender Quiz .
    const counter = this.state.unansweredQuestions[0]

    this.setState(prevState => ({
      counter: counter,
      question:      quizQuestions[counter].question,
      answerOptions: quizQuestions[counter].answers,
      behavior: {
        ...prevState.behavior,
        reveal: false,
      },
      discussion:    {
        correct:    false,
        discussion: "",
        label: ""
      }
    }))
    this.setNextPrevButtons()

  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <i className="fas fa-stethoscope fa-2x"/>
           <h3>EMQuick Board Review</h3>
          <label>
            <Toggle
              defaultChecked={this.state.behavior.studyMode}
              icons={false}
              onChange={this.handleStudyModeChange} />
            <span>Study Mode</span>
          </label>
        </header>
        {this.state.score >= 0 ? this.renderResult() : this.renderQuiz() }
      </div>
    )
  }

  renderQuiz () {
    return (
      <Quiz
        unansweredQuestions={this.state.unansweredQuestions}
        answer={this.state.selectedAnswers[this.state.counter]}
        answerOptions={quizQuestions[this.state.counter].answers}
        questionId={this.state.counter+1}
        question={quizQuestions[this.state.counter].question}
        questionTotal={quizQuestions.length}
        onAnswerSelected={this.handleAnswerSelected}
        handlePrevQuestion = {this.handlePrevQuestion}
        handleNextQuestion = {this.handleNextQuestion}
        handleReveal = {this.handleReveal}
        handleScore = {this.handleScore}
        discussion = {this.state.discussion}
        optionSelected = {this.state.behavior.optionSelected}
        reveal = {this.state.behavior.reveal}
        source = {quizQuestions[this.state.counter].source}
        references={quizQuestions[this.state.counter].references}
        studyMode = {this.state.behavior.studyMode}
        selectedAnswers = {this.state.selectedAnswers}
        handleReview = {this.handleReview}
        // unanswered = {this.state.unansweredQuestions.length}
        showPrevButton={this.state.gui.showPrev}
        showNextButton={this.state.gui.showNext}
      />


    )
  }

  renderResult () {
    return (
      <Result
        quizScore={this.state.score} />
    )
  }

  // renderReview () {
  // }
}
export default App;

//todo:  create question flag for review
//done:  toggle button to show unanswered
//todo:  progress bar showing answered / unanswered / flagged  ?s
//todo:  create scoring routine
//todo:  deploy in github pages for testing

//This is scope creep, but necessary!
//todo:  create user login using passport
//todo:  create a "test" for a user (consisting of X number of questions)
//todo:  create user profiles with history of test scores
