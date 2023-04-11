import React, { useRef, useState } from 'react';
import './App.css';


const useFocus = () => {
    const htmlElRef = useRef(null)
    const setFocus = () => {htmlElRef.current &&  htmlElRef.current.focus()}

    return [ htmlElRef, setFocus ] 
}

const Guess = ({ answerLength }) => {
    const form = useRef();
    const guessArray = Array(answerLength);
    guessArray.fill("");
    const [guess, setGuess] = useState(guessArray);
    const [focus, setFocus] = useState(0);
    const [inputRef, setInputFocus] = useFocus();

    const submitAnswer = (event) => {
        console.log(event);
        event.preventDefault();

    }

    const onKeyDown = (key, event) => {
        switch (event.code) {
            case "Backspace":
                if (key !== 0 && event.target.value === "") {
                    setFocus(key - 1);
                }
                break;
            case "ArrowLeft":
                if (key !== 0) {
                    setFocus(key - 1);
                }
                break;
            case "ArrowRight":
                if (key !== (answerLength - 1)) {
                    setFocus(key + 1);
                }
                break;
            case "Enter":
                form.current.requestSubmit();
                break;
            default:
                //do nothing
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

    }

    return (
        <form ref={form} className="guess" onSubmit={submitAnswer}>
            {guess.map((val, key) => {
                return (
                    <input ref={inputRef} value={val} key={key} autoFocus={key === focus} type="text" maxLength="1" 
                    onKeyDown={(e) => onKeyDown(key, e)} onChange={(e) => onLetterChange(key, e)}/>
                )
            })}
        </form>
    );
}

export default Guess;