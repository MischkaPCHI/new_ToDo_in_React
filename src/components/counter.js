import React, { useState } from 'react';
import audio from '/FrontEnd/new_to_do_react/src/sound/Kozel-Oret.mp3';


const Counter = () => {

    const alertSound = new Audio(audio);

    const [count, setCount] = useState(0);

    function createCounterPlus () {

    return function () {
        return setCount(count + 1);
    }
    }

    function createCounterMinus () {

    return function () {
        if(count !== 0){
        return setCount(count - 1);
        } else {
        alertSound.play();
        alert('Ниже 0 не идёт )');
        }
    }
    }

    const counterPlus = createCounterPlus();
    const counterMinus = createCounterMinus();

    return(
        <>
        <p className='num'>{count}</p>
        <button className="counter-btn" onClick={counterPlus}>+</button>
        <button className="counter-btn" onClick={counterMinus}>-</button>
        </>
    );
}

export default Counter;