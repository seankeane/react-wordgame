import React, { useState, useRef, useReducer } from 'react';
import './App.css';
import Guess from './Guess';
import LengthPicker from './LengthPicker';
import ResultCard from './ResultCard';
import LetterTracker from './LetterTracker';
import { retrieveAnswer, validateGuess } from './apiHelper';

const makeAlphabet = () => {
  return 'abcdefghijklmnopqrstuvwxyz'.split('');
}

const lettersLeftReducer = (state, { action, guess }) => {
  switch (action) {
    case "reset":
      return makeAlphabet();
    case "update":
      const newState = [];
      state.forEach(x => {
        if (!guess.includes(x)) {
          newState.push(x);
        }
      });
      return newState;
    default:
      throw Error('Unknown action in lettersLeftReducer.');
  }
}

const App = () => {

  const [answerLength, setAnswerLength] = useState(0);
  const [numberOfGuesses, setNumberOfGuesses] = useState([]);
  const [lettersLeft, setLettersLeft] = useReducer(lettersLeftReducer, makeAlphabet());
  const [result, setResult] = useState();
  const [answer, setAnswer] = useState(0);
  const startTime = useRef();

  const onAnswerLengthReceived = async (length) => {
    setAnswerLength(length);
    updateGuesses({ action: "reset" });
    const data = await retrieveAnswer(length);
    setAnswer(data.answer);
    startTime.current = new Date().getTime();
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
        setLettersLeft({ action: "update", guess: guess });
        break;
      case "solve":
        const listGuess = [...numberOfGuesses];
        listGuess[listGuess.length - 1] = guess;
        setNumberOfGuesses(listGuess);
        const finalTime = ((new Date().getTime() - startTime.current) / 1000).toFixed();
        const numOfGuesses = numberOfGuesses.length;
        setResult({ finalTime, numOfGuesses });
        break;
      default:
        throw Error('Unknown action found in updateGuesses.');
    }

  }

  const checkAnswerIsValidWord = async(guess) => {
    const resp = await validateGuess(guess);
    return resp.isValid;
  }

  const onGoAgain = (event) => {
    setAnswerLength(0);
    setResult(null);
    setLettersLeft({ action: "reset" });
  }

  return (
    <div>
      {!answerLength && <LengthPicker onConfirmAnswerLength={onAnswerLengthReceived} />}
      {answerLength >= 2 &&
        <div>
          {numberOfGuesses.map((val, key) => {
            return (
              <Guess key={key} answerLength={answerLength} answer={answer} updateGuesses={updateGuesses} checkAnswerIsValidWord={checkAnswerIsValidWord} />
            )
          })}
          {!result && <LetterTracker lettersLeft={lettersLeft} />}
          {result && <ResultCard onGoAgain={onGoAgain} result={result} answer={answer}/>}
        </div>
      }
    </div>
  );
}

export default App;