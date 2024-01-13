import Options from "./Options";

function Question({ question, dispatch, currentAnswer }) {
    return (
        <div className="question">
            <h4>{question.question}</h4>
            <Options question={question} dispatch={dispatch} currentAnswer={currentAnswer} />
        </div>
    );
}

export default Question;