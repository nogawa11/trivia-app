import React from 'react'
import Question from './Question'
import { nanoid } from "nanoid";

export default function Questions(props) {
  const [allQuestions, setAllQuestions] = React.useState([])
  const [quizEnded, setQuizEnded] = React.useState(false)
  const [correctAnswersCount, setCorrectAnswersCount] = React.useState(0);

  React.useEffect(() => {
    async function getQuestions() {
      fetch("https://opentdb.com/api.php?amount=5&category=11&difficulty=medium&type=multiple")
        .then(res => res.json())
        .then(data => data.results)
        .then(questions => {
          return setAllQuestions(questions.map(question => {
            return {
              ...question,
              id: nanoid(),
              selectedAnswer: "",
              showAnswer: false
            }
          }))
        })
    }
    getQuestions()
  }, [])

  React.useEffect(() => {
    let correctAnswers = 0;
    allQuestions.forEach(question => {
      if (question.correct_answer === question.selectedAnswer) {
        correctAnswers += 1
      }
      setCorrectAnswersCount(correctAnswers)
    });
	}, [allQuestions]);

  const selectAnswer = (questionId, answer) => {
    setAllQuestions(prevQuestions => (
      prevQuestions.map(question => (
        question.id === questionId ?
          {...question, selectedAnswer: answer} :
          question
      ))
    ))
  }

  const questionElements = allQuestions.map((question) => {
    return <Question
      key={question.id}
      id={question.id}
      questionText={question.question}
      correctAnswer={question.correct_answer}
      incorrectAnswers={question.incorrect_answers}
      selectedAnswer={question.selectedAnswer}
      showAnswer={question.showAnswer}
      selectAnswer={selectAnswer}
    />
  })

  const checkAnswers = () => {
    setAllQuestions(prevQuestions => (
      prevQuestions.map(question => ({...question, showAnswer: true }))
    ));
    setQuizEnded(true)
	}

  const resetGame = () => {
    setQuizEnded(false)
    props.restart()
	}

  return (
    <div className="questions">
      {questionElements}
      <div className="check">
        {quizEnded &&
          <h3 className="correct-answers-text">
            You scored {correctAnswersCount}/5 correct answers
          </h3>
        }
        <button
          className="btn-check"
          onClick={quizEnded ? resetGame : checkAnswers}>{quizEnded ? "Play again" : "Check Answers"}</button>
      </div>
    </div>
  )
}
