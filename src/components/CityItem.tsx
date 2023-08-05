import React from 'react';
import { Link } from 'react-router-dom';

import { City } from '../types/city';
import { useCities } from '../contexts/CitiesContext';
import styles from './CityItem.module.css';

interface CityItemProps {
    city: City;
}

const formatDate = (date: Date): string =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function CityItem({ city }: CityItemProps) {
  const { currentCity, deleteCity } = useCities();
  const { cityName, emoji, date, id, position}: Partial<City> = city;

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    deleteCity(city.id as number);
  }

  return (
    <li>
      <Link 
        className={`${styles.cityItem} ${id===currentCity.id ? styles['cityItem--active'] : ''}`} 
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button 
          className={styles.deleteBtn}
          onClick={handleClick}
        >
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;