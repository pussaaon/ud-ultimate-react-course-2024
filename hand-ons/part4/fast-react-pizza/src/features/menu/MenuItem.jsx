import { formatCurrency } from "../../utils/helpers";
import { useDispatch } from "react-redux";
import { addItem } from "../cart/cartSlice";
import Button from "../../ui/Button";

function MenuItem({ item }) {
    const { id, name, unitPrice, ingredients, soldOut, imageUrl } = item;
    const dispatch = useDispatch();

    function handleAddToCart() {
        const newItem = {
            pizzaId: id,
            name: name,
            quantity: 1,
            unitPrice: unitPrice,
            totalPrice: unitPrice
        }
        dispatch(addItem(newItem));
    }

    return (
        <li className="flex gap-4 py-2">
            <img src={imageUrl}
                alt={name}
                className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`} />
            <div className="flex flex-col grow pt-0.5">
                <p className="font-medium">{name}</p>
                <p className="text-sm capitcalize italic text-stone-500">{ingredients.join(', ')}</p>
                <div className="mt-auto flex items-center justify-between">
                    {!soldOut
                        ? <>
                            <p className="text-sm">{formatCurrency(unitPrice)}</p>
                            <Button type="small"
                                onClick={handleAddToCart}
                            >Add to cart</Button>
                        </>
                        : <p className="text-sm font-medium uppercase text-stone-500">Sold out</p>}
                </div>
            </div>
        </li>
    );
}

export default MenuItem;
