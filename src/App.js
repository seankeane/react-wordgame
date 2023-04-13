import React, { useState, useRef, useReducer } from 'react';
import './App.css';
import Guess from './Guess';
import LengthPicker from './LengthPicker';
import EnglishWords from 'an-array-of-english-words';
import { GiSandsOfTime, GiMagnifyingGlass, GiClockwiseRotation } from "react-icons/gi";
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

  const [answerLength, setAnswerLength] = useState(1);
  const [numberOfGuesses, setNumberOfGuesses] = useState([]);
  const [lettersLeft, setLettersLeft] = useReducer(lettersLeftReducer, makeAlphabet());
  const [result, setResult] = useState();
  const wordList = useRef([]);
  const answer = useRef(null);
  const startTime = useRef(new Date().getTime());

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
        setLettersLeft({ action: "update", guess: guess });
        break;
      case "solve":
        const listGuess = [...numberOfGuesses];
        listGuess[listGuess.length - 1] = guess;
        setNumberOfGuesses(listGuess);

        //TODO return text that answer was found
        const finalTime = ((new Date().getTime() - startTime.current) / 1000).toFixed();
        const numOfGuesses = numberOfGuesses.length;
        // stop and show timer? and number of guesses?
        setResult({ finalTime, numOfGuesses });
        // restart button

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
    setAnswerLength(1);
    setResult(null);
    setLettersLeft({ action: "reset" });
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
          {!result && <LetterTracker lettersLeft={lettersLeft} />}
          {result && <div className="result">
            <p>Yes, the answer was <strong>{answer.current}</strong>.</p>
            <GiSandsOfTime className="result-icon" />
            <p>You found the answer in <strong>{result.finalTime} seconds</strong></p>
            <GiMagnifyingGlass className="result-icon" />
            <p>and in <strong>{result.numOfGuesses}</strong> {result.numOfGuesses === 1 ? 'guess' : 'guesses'}!</p>
            <div className="result-row" onClick={onGoAgain}>
              <p>Click here to go again!</p>
              <GiClockwiseRotation className="result-icon" />
            </div>
          </div>
          }
        </div>
      }
    </div>
  );
}

export default App;