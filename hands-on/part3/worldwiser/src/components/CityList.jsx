import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCitiesContext } from "../context/CitiesContext";

function CityList() {

    const { cities, isLoading } = useCitiesContext();

    if (isLoading) return <Spinner />;
    if (!cities.length) return <Message message="Start adding a city from the map." />;
    return <ul className={styles.cityList}>
        {cities.map(city => <CityItem key={city.id} city={city} />)}
    </ul>
}

export default CityList
