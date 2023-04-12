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


function App() {
  const wordList = makeWordList(3);
  const answer = makeAnswer(wordList);
  console.log(`The answer is ${answer}`);

  const initialGuess = Array(1).fill("");
  const [answerLength, setAnswerLength] = useState(1);
  const [numberOfGuesses, setNumberOfGuesses] = useState(initialGuess);

  const onAnswerLengthReceived = (length) => {
    setAnswerLength(length);
  }

  return (
    <div>
      {answerLength === 1 && <LengthPicker onConfirmAnswerLength={onAnswerLengthReceived}/>}
      {answerLength >= 2 &&
        <div>
          {numberOfGuesses.map(() => {
            return (
              <Guess answerLength={answerLength} />
            )
          })}
        </div>
      }
    </div>
  );
}

export default App;
