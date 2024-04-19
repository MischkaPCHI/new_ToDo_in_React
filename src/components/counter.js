import React, { useState } from "react";
import audio from "/FrontEnd/new_to_do_react/src/sound/Kozel-Oret.mp3";

const Counter = () => {
  const alertSound = new Audio(audio);

  const [count, setCount] = useState(0);

  function createCounterPlus() {
    setCount(prevCount => prevCount + 1);
  }

  function createCounterMinus() {
      if (count !== 0) {
        setCount(prevCount => prevCount - 1);
      } else {
        alertSound.play();
        alert("Ниже 0 не идёт )");
      }
  }

  return (
    <>
      <p className="num">{count}</p>
      <button className="counter-btn" onClick={createCounterPlus}>
        +
      </button>
      <button className="counter-btn" onClick={createCounterMinus}>
        -
      </button>
    </>
  );
};

export default Counter;
