import styles from './Map.module.css'
import Button from './Button';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from 'react-leaflet'
import { useCitiesContext } from '../context/CitiesContext';
import { useGeolocation } from '../hooks/useGeolocation';
import { useUrlPosition } from '../hooks/useUrlPosition';

function Map() {

    const navigate = useNavigate();

    const { cities } = useCitiesContext();
    const [mapPosition, setMapPosition] = useState([40, 40]);
    const {
        isLoading: isLoadingPosition,
        position: geoPosition,
        getPosition } = useGeolocation();

    const [mapLat, mapLng] = useUrlPosition();

    useEffect(() => {
        if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    }, [mapLat, mapLng]);

    useEffect(() => {
        if (geoPosition)
            setMapPosition([geoPosition.lat, geoPosition.lng]);
    }, [geoPosition]);

    return (
        <div className={styles.mapContainer}>
            <Button type="btn-position" onClick={getPosition}>
                {isLoadingPosition ? "Loading..." : "Use your position"}
            </Button>
            <MapContainer
                center={mapPosition}
                zoom={12}
                scrollWheelZoom={false}
                className={styles.map}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" />
                {cities.map((city) => (
                    <Marker
                        position={[city.position.lat, city.position.lng]}
                        key={city.id}>
                        <Popup>
                            <span>{city.emoji}</span>
                            <span>{city.cityName}</span>
                        </Popup>
                    </Marker>
                ))}
                <ChangeCenter position={mapPosition} />
                <DetectClick />
            </MapContainer>
        </div>
    )
}

function ChangeCenter({ position }) {
    const map = useMap();
    map.setView(position);
    return null;
}

function DetectClick() {
    const navigate = useNavigate();

    useMapEvent({
        click: e => {
            navigate(`addform?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
        }
    });
}


export default Map
