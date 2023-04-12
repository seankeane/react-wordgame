import React, { useState, useReducer } from 'react';
import './App.css';

const guessReducer = (state, { action, key, value, answer }) => {
    const newState = [];
    switch (action) {
        case 'update':
            state.forEach((x, i) => {
                if (i === key) {
                    newState.push({ letter: value, check: 0 });
                } else {
                    newState.push(x);
                }
            });
            return newState;
        case 'invalidate-all':
            state.forEach(x => {
                newState.push({ letter: x.letter, check: -1 });
            })
            return newState;
        case 'invalidate-single':
            state.forEach((x, i) => {
                if (i === key) {
                    newState.push({ letter: value, check: -1 });
                } else {
                    newState.push(x);
                }
            });
            return newState;
        case 'review':
            state.forEach((x, i) => {
                if (x.letter === answer[i]) {
                    newState.push({ letter: x.letter, check: 2 });
                } else if (answer.includes(x.letter)) {
                    newState.push({ letter: x.letter, check: 1 });
                } else {
                    newState.push({ letter: x.letter, check: 0 });
                }
            })
            return newState;
        default:
            throw Error('Unknown action in guessReducer reducer.');
    }
}

const parseGuess = (guessArray) => {
    let guess = "";
    guessArray.forEach(({letter}) => {
        guess += letter;
    });
    return guess;
}

const Guess = ({ answerLength, answer, updateGuesses, checkAnswerIsValidWord }) => {
    const guessArray = Array(answerLength).fill({ letter: "", check: 0 });
    const [guess, handleGuess] = useReducer(guessReducer, guessArray);
    const [isGuessSubmitted, setIsGuessSubmitted] = useState(false);


    const onKeyDown = (key, event) => {
        try {
            const inputMap = { ...event.target.parentElement.childNodes };
            switch (event.code) {
                case "Backspace":
                    // if backspace is pressed and there is no letter move to box on the left
                    if (key !== 0 && event.target.value === "") {
                        inputMap[key - 1].focus();
                    }
                    break;
                case "ArrowLeft":
                    // if left arrow key is pressed move to box on the left
                    if (key !== 0) {
                        inputMap[key - 1].focus();
                    }
                    break;
                case "ArrowRight":
                    // if right arrow key is pressed move to box on the right
                    if (key !== (answerLength - 1)) {
                        inputMap[key + 1].focus();
                    }
                    break;
                case "Enter":
                    // if enter is pressed check guess against answer
                    if (parseGuess(guess) === answer) {
                        handleGuess({ action: "review", answer: answer });
                        updateGuesses({ action: "solve", guess: guess });
                        setIsGuessSubmitted(true);
                    } else if (checkAnswerIsValidWord(guess)) {
                        handleGuess({ action: "review", answer: answer });
                        updateGuesses({ action: "add", guess: guess });
                        setIsGuessSubmitted(true);
                    } else {
                        const updateGuess = [...guess];
                        updateGuess.forEach(x => { x.check = -1 });
                        handleGuess({ action: "invalidate-all" });
                    }
                    break;
                default:
                    // do nothing
                    break;
            }
        } catch (error) {
            console.log(`Failure during key down handler: ${error}`);
        }
    }

    const onLetterChange = (key, event) => {
        const letter = event.target.value.toLowerCase();
        if (/[a-z]/.test(letter) || letter === "") {
            handleGuess({ action: "update", key: key, value: letter });
        } else {
            handleGuess({ action: "invalidate-single", key: key, value: letter });
        }

        try {
            if (letter !== "" && key < (answerLength - 1)) {
                event.target.parentElement.childNodes[key + 1].focus();
            }
        } catch (error) {
            console.error(`Failed to switch focus due to error: ${error}`);
        }

    }

    const correctStyle = {
        'backgroundColor': 'green'
    };
    const nearlyStyle = {
        'backgroundColor': 'yellow'
    };
    const invalidStyle = {
        'backgroundColor': 'red'
    }

    const setLetterStyle = (check) => {
        switch (check) {
            case 1:
                return nearlyStyle;
            case 2:
                return correctStyle;
            case -1:
                return invalidStyle;
            default:
                return undefined;
        }
    }

    return (
        <div className="guess">
            {guess.map((entry, key) => {
                return (
                    <input style={setLetterStyle(entry.check)} value={entry.letter} key={key} disabled={isGuessSubmitted} autoFocus={key === 0} type="text" maxLength="1"
                        onKeyDown={(e) => onKeyDown(key, e)} onChange={(e) => onLetterChange(key, e)} />
                )
            })}
        </div>
    );
}

export default Guess;