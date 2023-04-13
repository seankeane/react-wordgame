import React, { useState, useRef, useReducer } from 'react';
import './App.css';
import Guess from './Guess';
import LengthPicker from './LengthPicker';
import ResultCard from './ResultCard';
import EnglishWords from 'an-array-of-english-words';
import LetterTracker from './LetterTracker';

const makeWordList = (answerLength) => {
  return EnglishWords.filter(d => (/^[a-z]*$/.test(d) && d.length === answerLength));
}

const makeAnswer = (wordList) => {
  const n = Math.floor(Math.random() * wordList.length);
  return wordList[n];
}

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
  const wordList = useRef();
  const answer = useRef();
  const startTime = useRef();

  const onAnswerLengthReceived = (length) => {
    setAnswerLength(length);
    updateGuesses({ action: "reset" });
    wordList.current = makeWordList(length);
    answer.current = makeAnswer(wordList.current);
    startTime.current = new Date().getTime();
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

  const checkAnswerIsValidWord = (guess) => {
    let parsedGuess = '';
    guess.forEach(x => {
      parsedGuess += x.letter;
    })
    return wordList.current.includes(parsedGuess);
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
              <Guess key={key} answerLength={answerLength} answer={answer.current} updateGuesses={updateGuesses} checkAnswerIsValidWord={checkAnswerIsValidWord} />
            )
          })}
          {!result && <LetterTracker lettersLeft={lettersLeft} />}
          {result && <ResultCard onGoAgain={onGoAgain} result={result} answer={answer.current}/>}
        </div>
      }
    </div>
  );
}

export default App;