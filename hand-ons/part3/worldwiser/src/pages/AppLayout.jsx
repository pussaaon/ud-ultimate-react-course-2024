import Sidebar from "../components/Sidebar"
import styles from './AppLayout.module.css'
import Map from "../components/Map"
import User from "../components/User"
import { useAuthContext } from "../context/FakeAuthContext";

function AppLayout() {
    const { isAuthenticated } = useAuthContext();
    return (
        <div className={styles.app}>
            {isAuthenticated && <User />}
            <Sidebar />
            <Map />
        </div>
    )
}

export default AppLayout
