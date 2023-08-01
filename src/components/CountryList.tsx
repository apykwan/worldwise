import CountryItem from './CountryItem';
import Spinner from './Spinner';
import Message from './Message';
import { Country } from '../types/country';
import { useCities } from '../contexts/CitiesContext';
import styles from './CountryList.module.css';



function CountryList() {
  const { cities, isLoading } = useCities();

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
      {countries.map((country: Country) => 
        <CountryItem key={country.country} country={country} />
      )}
    </ul>
  );
}

export default CountryList;