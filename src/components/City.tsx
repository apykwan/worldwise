import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Spinner from './Spinner';
import BackButton from './BackButton';
import { useCities } from '../contexts/CitiesContext';
import { City as CityType } from '../types/city';
import styles from "./City.module.css";

const formatDate = (date: Date): string | null => {
  if (!date) return null;
  
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));
}
  
function City() {
  const { id } = useParams();
  const { getCity, currentCity, isLoading } = useCities();

  useEffect(function() {
    getCity(Number(id));
  }, [id, getCity]);

  if (isLoading) return <Spinner />

  const { cityName, emoji, date, notes }: Partial<CityType> = currentCity;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <BackButton />

    </div>
  );
}

export default City;
