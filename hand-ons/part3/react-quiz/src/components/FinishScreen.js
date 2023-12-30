function FinishScreen({ points, totalPoints, highestPoints, dispatch }) {
    const percentage = (points / totalPoints) * 100;

    let emoji;

    if (percentage === 100) emoji = "👑"
    if (percentage >= 80 && percentage < 100) emoji = "🏆"
    if (percentage >= 60 && percentage < 80) emoji = "🥇"
    if (percentage >= 40 && percentage < 60) emoji = "🥈"
    if (percentage < 40) emoji = "🥹"

    return (
        <>
            <p className="result">
                <span>{emoji}</span>You scored <strong>{points}</strong> out of {" "}
                {totalPoints} points.
                ({Math.ceil(percentage)}%)
            </p>
            <p className="highscore">(Highest Points: {highestPoints})</p>
            <button
                className="btn btn-ui"
                onClick={() => dispatch({ type: "restart" })}>
                Restart Quiz
            </button>
        </>
    );
}

export default FinishScreen;