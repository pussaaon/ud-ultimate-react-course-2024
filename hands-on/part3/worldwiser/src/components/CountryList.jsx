import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCitiesContext } from "../context/CitiesContext";

function CountryList() {

    const { cities, isLoading } = useCitiesContext();

    if (isLoading) return <Spinner />;

    if (!cities.length) return <Message message="Start adding a city from the map." />;

    const countries = cities.reduce((arr, city) => {
        if (!arr.map(c => c.country).includes(city.country))
            return [...arr, { country: city.country, emoji: city.emoji }]
        else return arr;
    }, []);

    return <ul className={styles.countryList}>
        {countries.map(country => <CountryItem key={country.country} country={country} />
        )}
    </ul>
}

export default CountryList
