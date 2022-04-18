import React from 'react'
import Questions from './components/Questions'

function App() {
  const [startedQuiz, setStartedQuiz] = React.useState(false)

  const restart = () => setStartedQuiz(prevState => !prevState)
  const startQuiz = () => setStartedQuiz(true)

  return (
    <div className="App">
      <main>
        {startedQuiz ?
          <>
            <Questions restart={() => restart()} />
          </> :
          <div className="opening">
            <h1 className="title">Quizzical</h1>
            <p className="description">Test your film knowledge!</p>
            <button className="btn-start" onClick={startQuiz}>Start quiz</button>
          </div>
        }
      </main>
    </div>
  );
}

export default App;
