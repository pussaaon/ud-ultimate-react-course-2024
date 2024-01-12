import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { increaseItemQuantity, decreaseItemQuantity } from "./cartSlice";

function UpdateItemQuantity({ itemId, currentQuantity }) {

    const dispatch = useDispatch();

    return <div className="flex items-center gap-2 md:gap-3">
        <Button type="round" onClick={() => dispatch(decreaseItemQuantity(itemId))}>-</Button>
        <span className="text-sm font-medium">{currentQuantity}</span>
        <Button type="round" onClick={() => dispatch(increaseItemQuantity(itemId))}>+</Button>
    </div>
}

export default UpdateItemQuantity
