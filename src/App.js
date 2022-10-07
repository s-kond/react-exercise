import './App.css';
import { useEffect, useState} from 'react';
import { getFromLocalStorage, addToLocalStorage } from "./lib/localStorage"
import { ErrorBoundary} from "react-error-boundary";
import styled from 'styled-components';
import useCounter from './hooks/useCounter';

function App() {
  const [count, increment, decrement] = useCounter(getFromLocalStorage("count") ?? 0);
  const [count_2, increment_2, decrement_2] = useCounter(0);
  const [evenOrOdd, setEvenOrOdd] = useState();
  const [numberGuess, setNumberGuess] = useState();

  useEffect(() => {
    addToLocalStorage("count", count);
    evenOdd();
  }, [count, count_2])
  
  function evenOdd() {
    let sum  = count + count_2;
    if(sum === 0) {
      setEvenOrOdd("");
    } else if(sum % 2 === 0) {
      setEvenOrOdd("Even");
  } else {
      setEvenOrOdd("Odd"); 
  }
}

  function ErrorCallback({error, resetErrorBoundary}){
    return (
      <div role="alert">
        <pre style={{ color: "red" }}>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    );
  }

  function CreateError({numberGuess}){
    if(numberGuess === undefined){
      return "Guess the right number (0-10). Eine falsche Eingabe produziert eine Fehlermeldung."
    } else if(numberGuess === 3){
      return `Yes, ${numberGuess} is right!`;
  } else {
    throw new Error("Versuchs nochmal.")
  }
  }
  
  return (
    <div className="App">
      <ErrorBoundary FallbackComponent={ErrorCallback} onReset={()=> setNumberGuess()} >
        <h1>Guessing Game</h1>
        <label htmlFor='guess'>Your number: </label>
        <input name="guess" type="number" value={numberGuess} onChange={e => setNumberGuess(parseInt(e.target.value))}/>
        <Paragraph><CreateError numberGuess = {numberGuess}/></Paragraph>
      </ErrorBoundary>

      <CounterContainer>
        <div>
          <Heading>Counter</Heading>
          <p>{count}</p>
          <button onClick={increment} >+1</button>
          <button onClick={decrement}>-1</button>   
        </div>
        <div>
          <Heading>Counter 2</Heading>
          <p>{count_2}</p>
          <button onClick={increment_2} >+1</button>
          <button onClick={decrement_2}>-1</button>   
        </div>
      </CounterContainer>  
        <div>
          <p>Sum: {count + count_2}</p>
          <p>{evenOrOdd}</p>
        </div> 
    </div>
  );
}

export default App;

const Heading = styled.h2`
  margin-top: 50px;
`
const CounterContainer = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: space-evenly;
`
const Paragraph = styled.p`
  width: 70%;
  margin: 20px auto;
`