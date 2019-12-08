import React from 'react';

const ListQuestion = ({ questions, deleteQuestion }) => {

  return (
    <ul>
      {
        questions &&
        questions.length > 0 ?
          (
            questions.map(question => {
              return (
                <li key={question._id} onClick={() => deleteQuestion(question._id)}>{question.question}</li>
              )
            })
          )
          :
          (
            <li>No questions(s) left</li>
          )
      }
    </ul>
  )
}

export default ListQuestion