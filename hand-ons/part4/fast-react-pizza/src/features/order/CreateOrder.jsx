import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button"

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
        str
    );

const fakeCart = [
    {
        pizzaId: 12,
        name: "Mediterranean",
        quantity: 2,
        unitPrice: 16,
        totalPrice: 32,
    },
    {
        pizzaId: 6,
        name: "Vegetale",
        quantity: 1,
        unitPrice: 13,
        totalPrice: 13,
    },
    {
        pizzaId: 11,
        name: "Spinach and Mushroom",
        quantity: 1,
        unitPrice: 15,
        totalPrice: 15,
    },
];

function CreateOrder() {
    const navigation = useNavigation();
    const actionResult = useActionData();
    const isSubmitting = navigation.state === "submitting";
    // const [withPriority, setWithPriority] = useState(false);
    const cart = fakeCart;

    return (
        <div className="px-4 py-6">
            <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

            <Form method="POST" action="/order/new">
                <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
                    <label className="sm:basis-40">First Name</label>
                    <input type="text" name="customer" required className="input" />
                </div>

                <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
                    <label className="sm:basis-40">Phone number</label>
                    <div className="grow">
                        <input type="tel" name="phone" required className="input w-full" />
                    </div>
                    {actionResult?.errors?.phone &&
                        <p className="mt2 rounded-md bg-red-100 p-2 text-xs text-red-700">{actionResult.errors.phone}</p>}
                </div>

                <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
                    <label className="sm:basis-40">Address</label>
                    <div className="grow">
                        <input type="text" name="address" required className="input w-full" />
                    </div>
                </div>

                <div className="mb-12 flex items-center gap-5">
                    <input
                        className="h-6 w-6 accent-yellow-400 
                            focus:outline-none focus:ring focus:ring-yellow-400
                            focus:ring-offset-2"
                        type="checkbox"
                        name="priority"
                        id="priority"
                    // value={withPriority}
                    // onChange={(e) => setWithPriority(e.target.checked)}
                    />
                    <label htmlFor="priority" className="font-medium">Want to yo give your order priority?</label>
                </div>

                <div>
                    <input type="hidden" name="cart" value={JSON.stringify(cart)} />
                    <Button disabled={isSubmitting} type="primary">
                        {isSubmitting ? "Placing order..." : "Order now"}
                    </Button>
                </div>
                <div></div>
            </Form>
        </div>
    );
}

async function action({ request }) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    console.log(data)

    const order = {
        ...data,
        cart: JSON.parse(data.cart),
        priority: data.priority === 'on',
    }


    const errors = {}
    if (!isValidPhone(order.phone))
        errors.phone = "Invalid phone number";

    if (Object.keys(errors).length > 0)
        return { errors, status: 400 };

    // const newOrder = await createOrder(order);
    // return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
export { action }
