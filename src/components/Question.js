import { decode } from 'html-entities';

export default function Question(props) {
  const incorrectAnswers = props.incorrectAnswers.map(answer => {
    const incorrectAnswerClass =`
      ${answer === props.selectedAnswer ? "btn-answer selected" : "btn-answer" }
      ${(props.showAnswer && props.selectedAnswer === answer) && "incorrect"}
    `
		return <button
      className={incorrectAnswerClass}
      onClick={() => props.selectAnswer(props.id, answer)}>
			{ decode(answer) }
		</button>
	});

  const correctAnswerClass = `
    ${props.correctAnswer === props.selectedAnswer ? "btn-answer selected" : "btn-answer"}
    ${props.showAnswer && "correct"}
  `

  const correctAnswer =
		<button
      className={correctAnswerClass}
      onClick={() => props.selectAnswer(props.id, props.correctAnswer)}
    >
			{ decode(props.correctAnswer) }
		</button>

  incorrectAnswers.push(correctAnswer);

  const choices = incorrectAnswers.sort((a, b) => (
		a.props.children.localeCompare(b.props.children))
	);

  return(
    <div className="question-container">
      <h3 className="question-text">{decode(props.questionText)}</h3>
      <div className="question-choices">
        {choices}
      </div>
    </div>
  )
}
