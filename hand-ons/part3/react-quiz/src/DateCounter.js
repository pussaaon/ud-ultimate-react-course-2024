import { useReducer } from "react";

const initialState = { count: 0, step: 1 };

function reducer(state, action) {
    switch (action.type) {
        case "dec":
            return { ...state, count: state.count - state.step };
        case "inc":
            return { ...state, count: state.count + state.step };
        case "setCount":
            return { ...state, count: action.payload };
        case "setStep":
            return { ...state, step: action.payload };
        case "reset":
            return initialState;
        default:
            throw new Error("Unknown action type");
    }
}

function DateCounter() {
    const [counter, dispatch] = useReducer(reducer, initialState);

    // This mutates the date object.
    const date = new Date("june 21 2027");
    date.setDate(date.getDate() + counter.count);

    const dec = function () {
        dispatch({ type: "dec" })
        // setCount((count) => count - 1);
        // setCount((count) => count - step);
    };

    const inc = function () {
        dispatch({ type: "inc" })
        // setCount((count) => count + 1);
        // setCount((count) => count + step);
    };

    const defineCount = function (e) {
        dispatch({ type: "setCount", payload: Number(e.target.value) })
    };

    const defineStep = function (e) {
        dispatch({ type: "setStep", payload: Number(e.target.value) })
    };

    const reset = function () {
        dispatch({ type: "reset" });
    };

    return (
        <div className="counter">
            <div>
                <input
                    type="range"
                    min="0"
                    max="10"
                    value={counter.step}
                    onChange={defineStep}
                />
                <span>{counter.step}</span>
            </div>

            <div>
                <button onClick={dec}>-</button>
                <input value={counter.count} onChange={defineCount} />
                <button onClick={inc}>+</button>
            </div>

            <p>{date.toDateString()}</p>

            <div>
                <button onClick={reset}>Reset</button>
            </div>
        </div>
    );
}
export default DateCounter;
