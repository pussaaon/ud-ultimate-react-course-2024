import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { calTotalPrice, calTotalQuantity } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {

    const totalQuantity = useSelector(calTotalQuantity);
    const totalPrice = useSelector(calTotalPrice);

    if (totalQuantity === 0) return null;

    return (
        <div className="flex items-center justify-between bg-stone-800 text-stone-200 uppercase px-4 py-4 sm:px-6 text-sm md:text-base">
            <p className="font-semi-bold text-stone-300 space-x-4 sm:space-x-6">
                <span>{totalQuantity} pizzas</span>
                <span>{formatCurrency(totalPrice)}</span>
            </p>
            <Link to="/cart">Open cart &rarr;</Link>
        </div>
    );
}

export default CartOverview;
