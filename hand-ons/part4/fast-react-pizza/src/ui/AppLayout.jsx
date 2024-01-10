import { Outlet, useNavigation } from "react-router-dom"
import CartOverview from "../features/cart/CartOverview"
import Header from "./Header"
import Loader from "./Loader";

function AppLayout() {
    const navigation = useNavigation();
    const isLoading = navigation.state === "loading";

    return (
        <div className="grid-row-[auto_1fr_auto] grid h-screen">
            {isLoading && <Loader />}

            <Header />

            <div className="overflow-scroll"></div>
            <main className="max-w-3xl mx-auto">
                <Outlet />
            </main>

            <CartOverview />
        </div>
    )
}

export default AppLayout
