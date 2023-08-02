// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import Message from './Message';
import Spinner from './Spinner';
import BackButton from './BackButton';
import Button from './Button';
import { ButtonType } from '../types/button';
import { useUrlPosition } from '../hooks/useUrlPosition';
import styles from "./Form.module.css";

export function convertToEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char: string) => 127397 + char.charCodeAt(0));

  return String.fromCodePoint(...codePoints);
}

function Form() {
  const navigate = useNavigate();
  const [lat, lng] = useUrlPosition();
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState<boolean>(false);
  const [cityName, setCityName] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [date, setDate] = useState<string | Date>(new Date());
  const [notes, setNotes] = useState<string>("");
  const [emoji, setEmoji] = useState<string>("");
  const [geocodingError, setGeocodingError] = useState<string>("");
  
  useEffect(function() {
    async function fetchCityData(): Promise<void> {
      try {
        setIsLoadingGeocoding(true);
        setGeocodingError("");
        const res = await fetch(`
          https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
        );
        const data = await res.json();

        if (!data.countryCode) throw new Error('That does not seem to be a city.');

        setCityName(data.city || data.locality || '');
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (error) {
        setGeocodingError((error as Error).message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }
    fetchCityData();
  }, [lat, lng]);

  if (isLoadingGeocoding) return <Spinner />;

  if (geocodingError) return <Message message={geocodingError} />;

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
          value={date as string}
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
        <Button type={ButtonType.PRIMARY} onClick={() => {}}>Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
