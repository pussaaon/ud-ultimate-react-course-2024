import { formatCurrency } from "../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { addItem, getItemQuantityInCart } from "../cart/cartSlice";
import Button from "../../ui/Button";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

function MenuItem({ item }) {
    const { id, name, unitPrice, ingredients, soldOut, imageUrl } = item;
    const cartQuantity = useSelector(getItemQuantityInCart(id));
    const isInCart = cartQuantity > 0;
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
                    {soldOut &&
                        <p className="text-sm font-medium uppercase text-stone-500">Sold out</p>}
                    {!soldOut &&
                        <>
                            <p className="text-sm">{formatCurrency(unitPrice)}</p>
                            {isInCart
                                ? <div className="flex items-center gap-3 sm:gap-8">
                                    <UpdateItemQuantity itemId={id} currentQuantity={cartQuantity} />
                                    <DeleteItem itemId={id} />
                                </div>
                                : <Button type="small"
                                    onClick={handleAddToCart}
                                >Add to cart</Button>
                            }
                        </>
                    }
                </div>
            </div>
        </li >
    );
}

export default MenuItem;
