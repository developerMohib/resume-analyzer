import { useState } from 'react';

const Wipe = () => {
    /**
     React-এ একটা button click করলে আমি state update করছি, কিন্তু state-এর আগের value-টাই পাচ্ছি। আবার state update করার পর সঙ্গে সঙ্গে console.log() করলেও আগের value দেখাচ্ছে। কেন এমন হচ্ছে?
     */

    const [count, setCount] = useState(0)

    const handleClick = () => {
        setCount(count + 1)
        
        console.log(count)
    }
    console.log(count)

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1>count {count} </h1>
            <button onClick={handleClick}>Increment</button>
        </div>
    );
};

export default Wipe;