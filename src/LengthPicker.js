import React, { useRef, useState } from 'react';

export default function LengthPicker({ onConfirmAnswerLength }) {
    const input = useRef(), minus = useRef(), plus = useRef();
    const [answerLength, setAnswerLength] = useState(5);

    const changeNumber = (event) => {
        let count = answerLength;
        if (event.target.id === "minus" && input.current.value > 2) {
            setAnswerLength(count - 1);
        } else if (event.target.id === "plus" && input.current.value < 10) {
            setAnswerLength(count + 1);
        }
    }

    return (
        <>
            <div className="container">
                <div className="input-container" onClick={changeNumber}>
                    <div ref={minus} id="minus">-</div>
                    <input ref={input} type="number" min="2" max="10" id="number" value={answerLength} readOnly/>
                    <div ref={plus} id="plus">+</div>
                </div>
                <input type="button" onClick={() => onConfirmAnswerLength(answerLength)} value="Confirm"/>
            </div>
        </>
    );
}