import React from 'react';
import './App.css';
import {
TbCircleLetterA, TbCircleLetterB, TbCircleLetterC, TbCircleLetterD, TbCircleLetterE, TbCircleLetterF, TbCircleLetterG,
TbCircleLetterH, TbCircleLetterI, TbCircleLetterJ, TbCircleLetterK, TbCircleLetterL, TbCircleLetterM, TbCircleLetterN,
TbCircleLetterO, TbCircleLetterP, TbCircleLetterQ, TbCircleLetterR, TbCircleLetterS, TbCircleLetterT, TbCircleLetterU,
TbCircleLetterV, TbCircleLetterW, TbCircleLetterX, TbCircleLetterY, TbCircleLetterZ
} from "react-icons/tb";

export default function LengthPicker({ lettersLeft }) {

    return (
        <>
        <div className="letter-tracker-description">Letters You Haven't Guessed:</div>
        <div className="letter-tracker">
        {lettersLeft.includes('a') && <TbCircleLetterA/>}
        {lettersLeft.includes('b') && <TbCircleLetterB/>}
        {lettersLeft.includes('c') && <TbCircleLetterC/>}
        {lettersLeft.includes('d') && <TbCircleLetterD/>}
        {lettersLeft.includes('e') && <TbCircleLetterE/>}
        {lettersLeft.includes('f') && <TbCircleLetterF/>}
        {lettersLeft.includes('g') && <TbCircleLetterG/>}
        {lettersLeft.includes('h') && <TbCircleLetterH/>}
        {lettersLeft.includes('i') && <TbCircleLetterI/>}
        {lettersLeft.includes('j') && <TbCircleLetterJ/>}
        {lettersLeft.includes('k') && <TbCircleLetterK/>}
        {lettersLeft.includes('l') && <TbCircleLetterL/>}
        {lettersLeft.includes('m') && <TbCircleLetterM/>}
        {lettersLeft.includes('n') && <TbCircleLetterN/>}
        {lettersLeft.includes('o') && <TbCircleLetterO/>}
        {lettersLeft.includes('p') && <TbCircleLetterP/>}
        {lettersLeft.includes('q') && <TbCircleLetterQ/>}
        {lettersLeft.includes('r') && <TbCircleLetterR/>}
        {lettersLeft.includes('s') && <TbCircleLetterS/>}
        {lettersLeft.includes('t') && <TbCircleLetterT/>}
        {lettersLeft.includes('u') && <TbCircleLetterU/>}
        {lettersLeft.includes('v') && <TbCircleLetterV/>}
        {lettersLeft.includes('w') && <TbCircleLetterW/>}
        {lettersLeft.includes('x') && <TbCircleLetterX/>}
        {lettersLeft.includes('y') && <TbCircleLetterY/>}
        {lettersLeft.includes('z') && <TbCircleLetterZ/>}
        </div>
        </>
    );
}