// 

import { useEffect, useState } from "react";

import styles from "./AddForm.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Spinner from "./Spinner";
import Message from "./Message";

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

    const [lat, lng] = useUrlPosition();
    const [isLoadingGeoData, setIsLoadingGeoData] = useState(false);
    const [geoError, setGeoError] = useState(null);
    const [emoji, setEmoji] = useState(null);
    const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

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

    if (isLoadingGeoData) return <Spinner />
    if (geoError) return <Message message={geoError} />

    return (
        <form className={styles.form}>
            <div className={styles.row}>
                <label htmlFor="cityName">City name</label>
                <input
                    id="cityName"
                    onChange={(e) => setCityName(e.target.value)}
                    value={cityName}
                />
                {/* <span className={styles.flag}>{emoji}</span> */}
            </div>

            <div className={styles.row}>
                <label htmlFor="date">When did you go to {cityName}?</label>
                <input
                    id="date"
                    onChange={(e) => setDate(e.target.value)}
                    value={date}
                />
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
