function NextButton({ currentAnswer, currentQuestion, totalQuestions, dispatch }) {
    if (currentAnswer === null) return null;
    return currentQuestion + 1 < totalQuestions
        ? <button
            className="btn btn-ui"
            onClick={() => dispatch({ type: "nextQuestion" })}>Next</button>
        : <button
            className="btn btn-ui"
            onClick={() => dispatch({ type: "finish" })}>Finish</button>
};

export default NextButton;