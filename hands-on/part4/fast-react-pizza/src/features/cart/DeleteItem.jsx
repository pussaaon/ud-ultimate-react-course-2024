import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { deleteItem } from "./cartSlice";

function DeleteItem({ itemId }) {

    const dispatch = useDispatch();

    function handleDeleteItem() {
        dispatch(deleteItem(itemId));
    }

    return <Button type="small" onClick={handleDeleteItem}>Delete</Button>
}

export default DeleteItem
