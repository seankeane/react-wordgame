import React, { useState } from 'react';
import './App.css';


const Guess = ({ answerLength, updateGuesses, checkAnswerIsValidWord }) => {
    const guessArray = Array(answerLength).fill({ letter: "", check: 0 });
    const [guess, setGuess] = useState(guessArray);
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
                    if (checkAnswerIsValidWord(guess)) {
                        updateGuesses({ action: "add", guess: "answer" });
                        setIsGuessSubmitted(true);
                    } else {
                        const updateGuess = [...guess];
                        updateGuess.forEach(x => { x.check = -1 });
                        setGuess(updateGuess);
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
        const newArray = guess.map((x, i) => {
            if (i === key) {
                return { letter: event.target.value.toLowerCase(), check: x.check };
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