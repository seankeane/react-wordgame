const retrieveAnswer = async (length) => {
    const resp = await fetch(`https://wordgame-api.herokuapp.com/answer?length=${length}`);
    //const resp = await fetch(`http://localhost:3001/answer?length=${length}`);
    return resp.json();
  }
  
const validateGuess = async (guess) => {
    const resp = await fetch(`https://wordgame-api.herokuapp.com/checkGuess?guess=${guess}`);
    //const resp = await fetch(`http://localhost:3001/checkGuess?guess=${guess}`);
    return resp.json();
  }
export {retrieveAnswer, validateGuess};
