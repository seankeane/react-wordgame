import React from 'react';
import './App.css';
import { GiSandsOfTime, GiMagnifyingGlass, GiClockwiseRotation } from "react-icons/gi";


export default function ResultCard({ onGoAgain, result, answer }) {

    return (
        <div className="result">
            <p>Yes, the answer was <strong>{answer}</strong>.</p>
            <GiSandsOfTime className="result-icon" />
            <p>You found the answer in <strong>{result.finalTime} seconds</strong></p>
            <GiMagnifyingGlass className="result-icon" />
            <p>and in <strong>{result.numOfGuesses}</strong> {result.numOfGuesses === 1 ? 'guess' : 'guesses'}!</p>
            <div className="result-row" onClick={onGoAgain}>
                <p>Click here to go again!</p>
                <GiClockwiseRotation className="result-icon" />
            </div>
        </div>
    );
}