import CityItem from './CityItem';
import Spinner from './Spinner';
import Message from './Message';
import { City } from '../types/city';
import { useCities } from '../contexts/CitiesContext';
import styles from './CityList.module.css';

function CityList() {
    const { cities, isLoading } = useCities();
    if (isLoading) return <Spinner />;

    if (!cities.length) return <Message message="Add your first city by clicking on a city on the map" />;

    return (
        <ul className={styles.cityList}>
            {cities?.map((city: City) => <CityItem key={city.id} city={city} />)}
        </ul>
    );
}

export default CityList;