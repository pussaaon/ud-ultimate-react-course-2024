import { useNavigate } from "react-router-dom";
import Button from "./Button";

function BackButton() {
    const navigate = useNavigate();

    return (
        <Button
            type="button"
            className="back"
            action={(e) => {
                e.preventDefault();
                navigate(-1);
            }}> &larr; Back</Button >
    );
}

export default BackButton;