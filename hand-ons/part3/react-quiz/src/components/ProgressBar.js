export default function ProgressBar({ currentQuestion, totalQuestions, points, totalPoints, currentAnswer }) {
    return (
        <div className="progress">
            <progress value={currentQuestion + Number(currentAnswer !== null)} max={totalQuestions}></progress>
            <p>Question <strong>{currentQuestion + 1}</strong> / {totalQuestions}</p>
            <p><strong>{points}</strong> / {totalPoints}</p>
        </div>
    );
}