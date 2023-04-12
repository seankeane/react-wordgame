import React, { useState, useRef } from 'react';
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
  const wordList = useRef([]);
  const answer = useRef(null);

  const onAnswerLengthReceived = (length) => {
    setAnswerLength(length);
    updateGuesses({ action: "reset" });
    wordList.current = makeWordList(length);
    answer.current = makeAnswer(wordList.current);
    console.log(`The answer is ${answer.current}`);
  }

  const updateGuesses = ({ action, guess }) => {
    switch (action) {
      case "reset":
        setNumberOfGuesses(Array(1).fill(""));
        break;
      case "add":
        const updateGuess = [...numberOfGuesses];
        updateGuess[updateGuess.length - 1] = guess;
        updateGuess.push("");
        setNumberOfGuesses(updateGuess);
        break;
      case "solve":
        const listGuess = [...numberOfGuesses];
        listGuess[listGuess.length - 1] = guess;
        setNumberOfGuesses(listGuess);
        break;
      default:
        throw Error('Unknown action found in updateGuesses.');
    }
  
}

const checkAnswerIsValidWord = (guess) => {
  let parsedGuess = '';
  guess.forEach(x => {
    parsedGuess += x.letter;
  })
  return wordList.current.includes(parsedGuess);
}

return (
  <div>
    {answerLength === 1 && <LengthPicker onConfirmAnswerLength={onAnswerLengthReceived} />}
    {answerLength >= 2 &&
      <div>
        {numberOfGuesses.map((val, key) => {
          return (
            <Guess key={key} answerLength={answerLength} answer={answer.current} updateGuesses={updateGuesses} checkAnswerIsValidWord={checkAnswerIsValidWord} />
          )
        })}
      </div>
    }
  </div>
);
}

export default App;
