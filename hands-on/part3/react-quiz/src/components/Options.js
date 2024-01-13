function Options({ question, dispatch, currentAnswer }) {

    const hasAnswered = currentAnswer !== null;

    return <div className="options">
        {question.options.map((option, index) => {
            return (
                <button
                    key={option}
                    className={`btn btn-option 
                        ${index === currentAnswer ? "answer" : ""}
                        ${hasAnswered
                            ? index === question.correctOption
                                ? "correct"
                                : "wrong"
                            : ""}`}
                    disabled={hasAnswered}
                    onClick={() => dispatch({ type: "answer", payload: index })}>
                    {option}
                </button>)
        })}
    </div >
}

export default Options;