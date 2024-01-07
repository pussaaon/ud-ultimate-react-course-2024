import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './Map.module.css'



function Map() {

    const [searchParams, setSearchParams] = useSearchParams();
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const navigate = useNavigate();

    return (
        <div className={styles.mapContainer} onClick={() => navigate("form")}>
            <p>Map</p>
            <p>Position: {lat}, {lng}</p>

            <button onClick={() => setSearchParams({ lat: 22, lng: 33 })}>Change Pos</button>
        </div>
    )
}

export default Map
