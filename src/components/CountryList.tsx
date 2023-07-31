import CountryItem from './CountryItem';
import Spinner from './Spinner';
import Message from './Message';
import { City } from '../types/city';
import { Country } from '../types/country';
import styles from './CountryList.module.css';

interface CountryListProps {
    cities: City[];
    isLoading: boolean;
}

function CountryList({ cities, isLoading }: CountryListProps) {
    if (isLoading) return <Spinner />;

    if (!cities.length) return <Message message="Add your first city by clicking on a city on the map" />;

    // const countries: Country[] = cities?.reduce((arr: Country[], city) => {
    //     if (!arr.map((el: Country) => el.country).includes(city.country))
    //     return [...arr, { country: city.country, emoji: city.emoji }];
    //     else return arr;
    // }, []);

    const uniqueCountries = new Set(
        cities.map(city => JSON.stringify({ country: city.country, emoji: city.emoji }))
    );

    const countries: Country[] = [...uniqueCountries].map(each => JSON.parse(each));
 
    return (
        <ul className={styles.countryList}>
            {countries.map((country: Country) => <CountryItem key={country.country} country={country} />)}
        </ul>
    );
}

export default CountryList;