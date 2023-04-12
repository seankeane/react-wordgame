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


  const initialGuess = Array(1).fill("");
  const [answerLength, setAnswerLength] = useState(1);
  const [numberOfGuesses, setNumberOfGuesses] = useState(initialGuess);

  const onAnswerLengthReceived = (length) => {
    setAnswerLength(length);
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
              <Guess key={key} answerLength={answerLength} />
            )
          })}
        </div>
      }
    </div>
  );
}

export default App;
