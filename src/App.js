import React, { useState } from 'react';
import './App.css';
import Guess from './Guess';
import LengthPicker from './LengthPicker';
import EnglishWords from 'an-array-of-english-words';

const makeWordList = (answerLength) => {
  return EnglishWords.filter(d => (/^[a-z]*$/.test(d) && d.length === answerLength));
}

const makeAnswer = (wordList) => {
  const n = Math.floor(Math.random() * wordList.length);
  return wordList[n];
}

const App = () => {
  
  const [answerLength, setAnswerLength] = useState(1);
  const [numberOfGuesses, setNumberOfGuesses] = useState([]);

  const updateGuesses = ({action, guess}) => {
    if (action === "reset") {
      setNumberOfGuesses(Array(1).fill(""))
    } else {
      const updateGuess = [...numberOfGuesses];
      updateGuess[updateGuess.length - 1] = guess;
      updateGuess.push("");
      setNumberOfGuesses(updateGuess);
    }
  }
  

  const onAnswerLengthReceived = (length) => {
    setAnswerLength(length);
    updateGuesses({action: "reset"});
    const wordList = makeWordList(length);
    const answer = makeAnswer(wordList);
    console.log(`The answer is ${answer}`);
  }

  return (
    <div>
      {answerLength === 1 && <LengthPicker onConfirmAnswerLength={onAnswerLengthReceived} />}
      {answerLength >= 2 &&
        <div>
          {numberOfGuesses.map((val, key) => {
            return (
              <Guess key={key} answerLength={answerLength} updateGuesses={updateGuesses}/>
            )
          })}
        </div>
      }
    </div>
  );
}

export default App;
