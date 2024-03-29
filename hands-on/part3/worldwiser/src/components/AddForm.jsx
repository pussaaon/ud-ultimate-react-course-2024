// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState, useEffect } from "react";
import { useUrlPosition } from "../hooks/useUrlPosition";
import styles from "./AddForm.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import Message from "./Message";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCitiesContext } from "../context/CitiesContext";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
    const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client"
//?latitude=0&longitude=0

function AddForm() {
    const [cityName, setCityName] = useState("");
    const [country, setCountry] = useState("");
    const [emoji, setEmoji] = useState("");
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState("");
    const [lat, lng] = useUrlPosition();
    const [isLoadingGeoData, setIsLoadingGeoData] = useState(false);
    const [geoError, setGeoError] = useState(null);
    const { addCity, isLoading } = useCitiesContext();
    const navigate = useNavigate();

    useEffect(() => {

        if (!lat || !lng) return;

        async function fetchCityData() {
            try {
                setIsLoadingGeoData(true);
                const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
                const data = await res.json();

                if (!data.countryCode) throw new Error("No country code found at this location");

                setCityName(data.city || data.locality || "");
                setCountry(data.countryName);
                setEmoji(convertToEmoji(data.countryCode));
            } catch (err) {
                setGeoError(err.message);
            } finally {
                setIsLoadingGeoData(false);
            }
        }
        fetchCityData();
    }, [lat, lng]);

    function handleSubmit(e) {
        e.preventDefault();

        if (!cityName || !date) return;

        const newCity = {
            cityName,
            country,
            emoji,
            date,
            notes,
            position: { lat, lng }
        }

        addCity(newCity);
        navigate("/app/cities/");
    }

    if (geoError) return <Message message={geoError} />;

    if (!lat || !lng) return <Message message="Start by clicking somewhere on the map." />;

    return (
        <form className={`${styles.form} ${isLoading ? "loading" : ""}`} onSubmit={handleSubmit}>
            <div className={styles.row}>
                <label htmlFor="cityName">City name</label>
                <input
                    id="cityName"
                    onChange={(e) => setCityName(e.target.value)}
                    value={cityName}
                />
                <span className={styles.flag}>{emoji}</span>
            </div>

            <div className={styles.row}>
                <label htmlFor="date">When did you go to {cityName}?</label>
                <DatePicker
                    id="date"
                    selected={date}
                    onChange={(newDate) => setDate(newDate)}
                    dateFormat="dd/MM/yyyy" />
            </div>

            <div className={styles.row}>
                <label htmlFor="notes">Notes about your trip to {cityName}</label>
                <textarea
                    id="notes"
                    onChange={(e) => setNotes(e.target.value)}
                    value={notes}
                />
            </div>

            <div className={styles.buttons}>
                <Button type="btn-primary">Add</Button>
                <BackButton />
            </div>
        </form>
    );
}

export default AddForm;
