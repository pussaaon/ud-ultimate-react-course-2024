import Header from './components/Header';
import Main from './components/Main';
import Loader from './components/Loader';
import Error from './components/Error';
import StartScreen from './components/StartScreen';
import Question from './components/Question';
import NextButton from './components/NextButton';
import ProgressBar from './components/ProgressBar';
import FinishScreen from './components/FinishScreen';
import { useEffect, useReducer } from 'react';
import Timer from './components/Timer';


const SECS_PER_QUESTION = 30;

const inititalState = {
    questions: [],
    currentQuestion: 0,
    currentAnswer: null,
    points: 0,
    highestPoints: 0,
    secondsRemaining: null,
    status: "loading"
};

function reducer(state, action) {
    switch (action.type) {
        case "data_received":
            return { ...state, questions: action.payload, status: "ready" };
        case "data_load_failed":
            return { ...state, status: "error" }
        case "start":
            return {
                ...state,
                status: "active",
                secondsRemaining: SECS_PER_QUESTION * state.questions.length
            }
        case "answer":
            const question = state.questions.at(state.currentQuestion);
            return {
                ...state,
                currentAnswer: action.payload,
                points:
                    action.payload === question.correctOption
                        ? state.points + question.points
                        : state.points
            }
        case "nextQuestion":
            return {
                ...state,
                currentQuestion: state.currentQuestion + 1,
                currentAnswer: null
            }
        case "finish":
            return {
                ...state,
                status: "finished",
                highestPoints: Math.max(state.points, state.highestPoints)
            }
        case "restart":
            return {
                ...inititalState,
                questions: state.questions,
                status: "ready"
            }
        case "tick":
            return {
                ...state,
                secondsRemaining: state.secondsRemaining - 1,
                status: state.secondsRemaining === 0 ? "finished" : state.status
            }
        default:
            throw new Error("invalid action type");
    }
}

export default function App() {

    const [{ questions, currentQuestion, currentAnswer, status, points, secondsRemaining }, dispatch] = useReducer(reducer, inititalState);

    const totalPoints = questions.reduce((acc, curr) => acc + curr.points, 0);

    useEffect(() => {
        fetch("http://localhost:8000/questions")
            .then((res) => res.json())
            .then((data) => dispatch({ type: "data_received", payload: data }))
            .catch((err) => dispatch({ type: "data_load_failed" }))
            .finally(() => console.log("finally"));
    }, []);

    return (
        <div className="app">
            <Header />
            <Main>
                {status === "loading" && <Loader />}
                {status === "error" && <Error />}
                {status === "ready" && <StartScreen totalQuestions={questions.length} dispatch={dispatch} />}
                {status === "active" && <>
                    <ProgressBar
                        currentQuestion={currentQuestion}
                        currentAnswer={currentAnswer}
                        totalQuestions={questions.length}
                        points={points}
                        totalPoints={totalPoints}
                    />
                    <Question
                        question={questions.at(currentQuestion)}
                        dispatch={dispatch}
                        currentAnswer={currentAnswer} />
                    <footer>
                        <Timer
                            secondsRemaining={secondsRemaining}
                            dispatch={dispatch}
                        />
                        <NextButton
                            dispatch={dispatch}
                            currentAnswer={currentAnswer}
                            currentQuestion={currentQuestion}
                            totalQuestions={questions.length}
                        />
                    </footer>
                </>}
                {status === "finished" &&
                    <FinishScreen
                        points={points}
                        totalPoints={totalPoints}
                        dispatch={dispatch}
                    />}
            </Main>
        </div>
    );
}