import CountryItem from './CountryItem';
import styles from './CountryList.module.css'
import Spinner from './Spinner';
import Message from './Message';
import { useCitiesContext } from '../contexts/CitiesContext';

function CountriesList() {

    const { cities, isLoading } = useCitiesContext();

    if (isLoading) return <Spinner />

    if (!cities.length) return (<Message message="Add your first city by clicking on a city on the map" />);

    const countries = cities.reduce((arr, city) => {
        if (!arr.map((el) => el.country).includes(city.country))
            return [...arr, { country: city.country, emoji: city.emoji, id: city.country }]
        else
            return arr;
    }, []);

    console.log(countries);

    return (
        <ul className={styles.countryList}>
            {countries.map(country => <CountryItem key={country.country} country={country} />)}
        </ul>
    )
}

export default CountriesList;
