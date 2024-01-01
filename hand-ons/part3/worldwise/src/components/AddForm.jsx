import { useEffect, useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./AddForm.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCitiesContext } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
    const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

function Form() {

    const [cityName, setCityName] = useState("");
    const [country, setCountry] = useState("");
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState("");
    const { createCity, isLoading } = useCitiesContext();

    const [lat, lng] = useUrlPosition();
    const [isLoadingGeoData, setIsLoadingGeoData] = useState(false);
    const [geoError, setGeoError] = useState(null);
    const [emoji, setEmoji] = useState(null);
    const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchCityData() {
            try {
                setIsLoadingGeoData(true);
                setGeoError(null);
                const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
                const data = await res.json();
                console.log(data);

                if (!data.countryCode) {
                    throw new Error("That's doesn't seem to be a city, Click somewhere else");
                }

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

    async function handleSubmit(e) {
        e.preventDefault();

        if (!cityName || !date) return;

        const newCity = {
            cityName,
            country,
            emoji,
            date,
            notes,
            position: { lat, lng },
        };

        await createCity(newCity);
        navigate("/app/cities");
    }

    if (isLoadingGeoData) return <Spinner />
    if (geoError) return <Message message={geoError} />

    return (
        <form className={`${styles.form} ${isLoading ? styles.loading : ""}`} onSubmit={handleSubmit}>
            <div className={styles.row}>
                <label htmlFor="cityName">City name</label>
                <input
                    id="cityName"
                    onChange={(e) => setCityName(e.target.value)}
                    value={cityName} />
                <span className={styles.flag}>{emoji}</span>
            </div>

            <div className={styles.row}>
                <label htmlFor="date">When did you go to {cityName}?</label>
                {/* <input
                    id="date"
                    onChange={(e) => setDate(e.target.value)}
                    value={date}
                /> */}
                <DatePicker
                    onChange={(date) => setDate(date)}
                    selected={date}
                    format="dd/MM/yyyy" />
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
                <Button
                    type="submit"
                    className="primary">Add</Button>
                <BackButton />
            </div>
        </form>
    );
}

export default Form;
