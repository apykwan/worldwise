import { Link } from 'react-router-dom';

import { City } from '../types/city';
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
    const { cityName, emoji, date, id }: Partial<City> = city;
    return (
      <li>
        <Link className={styles.cityItem} to={`${id}`}>
          <span className={styles.emoji}>{emoji}</span>
          <h3 className={styles.name}>{cityName}</h3>
          <time className={styles.date}>{formatDate(date)}</time>
          <button className={styles.deleteBtn}>&times;</button>
        </Link>
      </li>
    );
}

export default CityItem;