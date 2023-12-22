import { useState, useEffect } from 'react';

export default function Lesson2() {
    const [advice, setAdvice] = useState('');
    const [count, setCount] = useState(0);

    async function getAdvice() {
        setCount((c) => c + 1);
        const response = await fetch('https://api.adviceslip.com/advice');
        const data = await response.json();
        setAdvice(data.slip.advice);
    }

    useEffect(() => {
        getAdvice();
    }, []);

    return (
        <>
            <h1>Lesson 2</h1>
            <p>Advice: {advice}</p>
            <button onClick={getAdvice}>Get Advice</button>
            <Message count={count} />
        </>
    );
}

function Message({ count }) {
    return <p>You have read {count} advice</p>
}