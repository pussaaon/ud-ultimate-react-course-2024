function StartScreen({ totalQuestions, dispatch }) {
    return <div className="start">
        <h2>Welcome to the React Quiz</h2>
        <h4>{totalQuestions} questions to test your React mastery.</h4>
        <button className="btn btn-ui" onClick={() => dispatch({ type: 'start' })}>Let's Start</button>
    </div>;
}

export default StartScreen;