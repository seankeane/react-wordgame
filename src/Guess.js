import React, { useState } from 'react';
import './App.css';


const Guess = ({ answerLength, updateGuesses }) => {
    const guessArray = Array(answerLength).fill("");
    const [guess, setGuess] = useState(guessArray);
    const [isGuessSubmitted, setIsGuessSubmitted] = useState(false);

    const checkAnswer = () => {
        setIsGuessSubmitted(true);
    }

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
                    checkAnswer();
                    updateGuesses({action: "add", guess: "answer"});
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
        const newArray = guess.map((x, i) => {
            if (i === key) {
                return event.target.value;
            } else {
                return x;
            }
        });
        setGuess(newArray);
        try {
            if (event.target.value !== "" && key < (answerLength - 1)) {
                event.target.parentElement.childNodes[key + 1].focus();
            }
        } catch (error) {
            console.error(`Failed to switch focus due to error: ${error}`);
        }

    }

    return (
        <div className="guess">
            {guess.map((val, key) => {
                return (
                    <input value={val} key={key} disabled={isGuessSubmitted} autoFocus={key === 0} type="text" maxLength="1"
                        onKeyDown={(e) => onKeyDown(key, e)} onChange={(e) => onLetterChange(key, e)} />
                )
            })}
        </div>
    );
}

export default Guess;