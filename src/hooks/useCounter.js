import { useState } from "react";

export default function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  function increment() {
    setCount(count + 1);
  }

  function decrement() {
    if(count > 0){
      setCount(count - 1);
    }
  }

  return [count, increment, decrement];
}