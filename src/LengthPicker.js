import React, { useRef, useState } from 'react';

export default function LengthPicker({ onConfirmAnswerLength }) {
    const input = useRef(), minus = useRef(), plus = useRef();
    const [answerLength, setAnswerLength] = useState(5);

    const changeNumber = (event) => {
        let count = answerLength;
        if (event.target.id === "minus" && input.current.value > 2) {
            setAnswerLength(count - 1);
        } else if (event.target.id === "plus" && input.current.value < 8) {
            setAnswerLength(count + 1);
        }
    }

    return (
        <>
            <div className="container">
                <div className="input-container" onClick={changeNumber}>
                    <div ref={minus} id="minus">-</div>
                    <input ref={input} type="number" min="2" max="8" id="number" value={answerLength} readOnly/>
                    <div ref={plus} id="plus">+</div>
                </div>
                <br/>
                <input className="lengthButton" type="button" onClick={() => onConfirmAnswerLength(answerLength)} value="Confirm Answer Length"/>
            </div>
        </>
    );
}