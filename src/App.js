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

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      counter:       0,
      questionId:    1,
      question:      '',
      answerOptions: [],
      selectedAnswers: new Array(quizQuestions.length).fill(0),
      unansweredQuestions: [],
      answerKey: [],
      answer:        '',
      answersCount:  {},
      result:        '',
      behavior: {
        reveal: false,
        studyMode: true,
        reviewMode: false,
        optionSelected: false,
        unanswered: false
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
    this.setOptionSelected = this.setOptionSelected.bind(this)
    this.handleStudyModeChange = this.handleStudyModeChange.bind(this)
    this.handleScore = this.handleScore.bind(this)
    this.createAnswerKey = this.createAnswerKey.bind(this)
    this.checkUnanswered = this.checkUnanswered.bind(this)
    // this.setResults = this.setResults.bind(this)
    this.handleReview = this.handleReview.bind(this)
  }

  componentDidMount () {
    const shuffledAnswerOptions = quizQuestions.map((question) =>
      this.shuffleArray(question.answers)
    )

    this.setState({
      question:      quizQuestions[0].question,
      answerOptions: shuffledAnswerOptions[0]
    })
    this.createAnswerKey()
  }



  shuffleArray (array) {
    var currentIndex = array.length, temporaryValue, randomIndex

    //while there remain elements to shuffle
    while (0 !== currentIndex) {

      //pick a remaining element
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1;

      //and swap it with teh current element
      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }

    return array
  }

  handleAnswerSelected (event) {
    console.log("clicked: ", event.currentTarget.value)

    let selectedAnswers = this.state.selectedAnswers
    //this hides the answer when scrolling back through previously answered
    if (this.state.selectedAnswers[this.state.counter]) {

      this.setState(prevState => ({
        behavior: {                   // object that we want to update
          ...prevState.behavior,    // keep all other key-value pairs
          reveal: false       // update the value of specific key
        }
      }))
      // this.setState({
      //   reveal: false
      // })
    }

    //set selected answer based on answer's index
    selectedAnswers[this.state.counter] = parseInt(event.currentTarget.value)
    this.setState(prevState => ( {
      selectedAnswers: selectedAnswers,
      behavior: {
        ...prevState.behavior,
          optionSelected: true
      }
    }))


    // this.setUserAnswer(event.currentTarget.value)

    //thisis commented out b/c I don't want it to advance automatically
    // if (this.state.questionId < quizQuestions.length) {
      // setTimeout(() => this.setNextQuestion(), 300)
    // } else {
    //   console.log("This is the end of the quiz. Do something!")
      // setTimeout(() => this.setResults(this.handleScore()), 300)
    // }
  }

  // setUserAnswer (answer) {
  //   console.log("Answer: ", answer)
  //   this.setState((state) => ({
  //     answersCount: {
  //       ...state.answersCount,
  //       [answer]: (state.answersCount[answer] || 0) + 1
  //     },
  //     answer:  answer
  //   }));
  // }


  setOptionSelected (counter) {
    console.log("store array of correct answers here")
    if (this.state.selectedAnswers[counter]) {
      this.setState(prevState => ({
        behavior: {
          ...prevState.behavior,
          optionSelected: true
        }
      }))
    } else {
      this.setState(prevState => ({
        behavior: {
          ...prevState.behavior,
          optionSelected: false
        }
      }))
    }
  }

  handlePrevQuestion () {
    //decrement counter & Id, update state, but don't change previous answer
    if (this.state.counter===0) {
      console.log ("Can't go back")
      return
    } else {
      const counter = this.state.counter - 1
      const questionId = this.state.questionId - 1

      this.setOptionSelected(counter)

      this.setState(prevState => ({
        counter:       counter,
        questionId:    questionId,
        question:      quizQuestions[counter].question,
        answerOptions: quizQuestions[counter].answers,
        discussion: {
          correct: false,
          discussion: "",
          label: ""
        },
        behavior: {
          ...prevState.behavior,
          reveal: false
        }
      }))
    }
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
    let choice = quizQuestions[this.state.counter].answers.filter(
       option => option.id === parseInt(this.state.selectedAnswers[this.state.counter])
    )
    // console.log(choice[0])
    // console.log(choice[0].correct, choice[0].discussion)
    this.setState(prevState => ({
      behavior: {
        ...prevState.behavior,
        reveal: true
      },
      discussion: {
        correct: choice[0].correct,
        discussion: choice[0].discussion,
       // content: choice[0].content,
        label: choice[0].content
      }
    }))
  }

  checkUnanswered () {
    //maps through selected answers,
    // returns array location of unanswered,
    // then filters & returns only the unanswered ones.

    let unansweredQuestions = this.state.selectedAnswers.map((answer, i) => {
      if (answer === 0 ) {
        return i
      } else {
        return null
      }
    }).filter(el => {
        return el
      })

    console.log("Unanswered Questions", unansweredQuestions)

    this.setState({
      unansweredQuestions: unansweredQuestions,
    })

    if (unansweredQuestions.length>0) {
      console.log("There are unanswered questions")
      this.setState(prevState => ({
        behavior: {
          ...prevState.behavior,
          unanswered: true
        }
      }))
    } else {
      console.log("There are no unanswered questions")
      this.setState(prevState => ({
        behavior: {
          ...prevState.behavior,
          unanswered: false
        }
      }))
    }
  }

  async handleScore () {
    //check for unanswered
    console.log("checking for unanswered questions")
    await this.checkUnanswered()

    //score the test if there are no unanswered questions
    if (!this.state.behavior.unanswered) {
      console.log("There are no unanswered questions...scoring your test")
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
      // this.setResults(score)
    }  else {
      console.log("Can't score test due to unanswered questions")
    }
  }

  async handleNextQuestion () {
    //increment counter & Id, update state, but don't change answer if already answered
    if (this.state.behavior.reviewMode) {
      //If Review Mode On => Show next unanswered question
      await this.checkUnanswered()
      // if Review Mode On and Unanswered questions remain
      // set counter to next unanswered & do all the other normal things

      if (this.state.unasweredQuestions > 0) {
        const counter = this.state.unasweredQuestions[0]
        const questionId = counter+1
        this.setOptionSelected(counter)
        this.setNextQuestion(counter, questionId)

      } else {
        //If Review Mode On and no unanswered questions
        //Turn review mode off
        //Just do the normal stuff and go to next question

        this.setState(prevState => ({
          behavior: {
            ...prevState.behavior,
            reviewMode: false
          }
        }))
        const counter = this.state.counter + 1
        const questionId = this.state.questionId + 1
        this.setOptionSelected(counter)
        this.setNextQuestion(counter, questionId)
      }

    } else {
      //If review mode OFF AND Not at end => Show next Q
      if (this.state.counter < quizQuestions.length - 1) {
        const counter = this.state.counter + 1
        const questionId = this.state.questionId + 1
        this.setOptionSelected(counter)
        this.setNextQuestion(counter, questionId)


        // this.setState({
        //   counter:       counter,
        //   questionId:    questionId,
        //   question:      quizQuestions[counter].question,
        //   answerOptions: quizQuestions[counter].answers,
        //   discussion:    {
        //     correct:    false,
        //     discussion: ""
        //   },
        //   reveal:        false
        // })
      } else {
        console.log("Can't go forward")
        return

      }
    }
  }

  //   if (this.state.counter < quizQuestions.length - 1 ) {
  //     const counter = this.state.counter + 1
  //     const questionId = this.state.questionId  + 1
  //
  //     this.setOptionSelected(counter)
  //
  //     this.setState({
  //       counter:       counter,
  //       questionId:    questionId,
  //       question:      quizQuestions[counter].question,
  //       answerOptions: quizQuestions[counter].answers,
  //       discussion: {
  //         correct: false,
  //         discussion: ""
  //       },
  //       reveal: false
  //     })
  //   } else {
  //     console.log ("Can't go forward")
  //     return
  //
  //   }
  // }

  setNextQuestion (counter, questionId) {

    // const counter = this.state.counter + 1
    // const questionId = this.state.questionId + 1
    this.setState(prevState => ({
      counter:       counter,
      questionId:    questionId,
      question:      quizQuestions[counter].question,
      answerOptions: quizQuestions[counter].answers,
      behavior: {
        ...prevState.behavior,
        reveal: false
      },
      discussion:    {
        correct:    false,
        discussion: "",
        label: ""
      }
    }))
  }

  // this.setState({
  //   counter:       counter,
  //   questionId:    questionId,
  //   question:      quizQuestions[counter].question,
  //   answerOptions: quizQuestions[counter].answers,
  //   discussion:    {
  //     correct:    false,
  //     discussion: ""
  //   },
  //   reveal:        false
  // })

  // getResults () {
  //   const answersCount = this.state.answersCount
  //   const answersCountKeys = Object.keys(answersCount)
  //   const answersCountValues = answersCountKeys.map((key) => answersCount[key])
  //   const maxAnswersCount = Math.max.apply(null, answersCountValues)
  //
  //   return  answersCountKeys.filter((key) => answersCount[key] === maxAnswersCount)
  // }

  // setResults (result) {
  //     this.setState({score: result})
  //   }


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
    //grab first question ID & pass that to quiz by updating counter.
    const counter = this.state.unansweredQuestions[0]
    const questionId = counter + 1
    this.setState(prevState => ({
      counter: counter,
      questionId: questionId,
      question:      quizQuestions[counter].question,
      answerOptions: quizQuestions[counter].answers,
      behavior: {
        ...prevState.behavior,
        reveal: false,
        reviewMode: true,
      },
      discussion:    {
        correct:    false,
        discussion: "",
        label: ""
      }
    }))
  }

  render () {

    return (
      <div className="App">
        <header className="App-header">
          <i className="fas fa-stethoscope fa-2x" alt="logo"></i>
          {/*<img src={logo} className="App-logo" alt="logo"/>*/}
          <h3>EMQuick Board Review</h3>
          <label>
            <Toggle
              defaultChecked={this.state.behavior.studyMode}
              icons={false}
              onChange={this.handleStudyModeChange} />
            <span>Study Mode</span>
          </label>
        </header>

        { (this.state.behavior.unanswered) ?
          ((!this.state.behavior.reviewMode) ? this.renderReview()
          :  this.renderQuiz())
              :  ( this.state.score >= 0 ? this.renderResult()
                  : this.renderQuiz())
        }

        {/*{this.state.score >= 0 ? this.renderResult() : this.renderQuiz() }*/}
      </div>
    )
  }

  renderQuiz () {

    return (

      <Quiz
        unansweredQuestions={this.state.unansweredQuestions}
        answer={this.state.selectedAnswers[this.state.counter]}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
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
      />


    )
  }

  renderResult () {
    return (
      <Result
        quizScore={this.state.score} />
    )
  }

  renderReview () {
    return (
      <div>
      <h1>Review your unanswered questions</h1>
      <p>you have {this.state.unansweredQuestions.length} unanswered questions </p>
        <button onClick={this.handleReview}>Review</button>
      </div>
    )
  }
}
export default App;

//todo:  create question flag for review
//todo:  toggle button to show unanswered
//todo:  progress bar showing answered / unanswered / flagged  ?s
//todo:  create scoring routine
//todo:  create github repository
//todo:  deploy in github pages for testing

//This is scope creep, but necessary!
//todo:  create user login using passport
//todo:  create a "test" for a user (consisting of X number of questions)
//todo:  create user profiles with history of test scores
