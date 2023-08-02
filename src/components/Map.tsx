import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';

import Button from './Button';
import { useUrlPosition } from '../hooks/useUrlPosition';
import { useGeolocation } from '../hooks/useGeolocation';
import { useCities } from '../contexts/CitiesContext';
import { City, MapPosition } from '../types/city';
import { ButtonType } from '../types/button';
import styles from './Map.module.css';

function Map () {
  const { cities } = useCities();

  const [mapPosition, setMapPosition] = useState<MapPosition>([49.246292, -123.116226]);
  
  const [mapLat, mapLng] = useUrlPosition();
  const { 
    isLoading: isLoadingPosition, 
    position: geolocationPosition, 
    getPosition 
  } = useGeolocation();

  useEffect(function() {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  useEffect(function() {
    if (geolocationPosition) {
      const { lat, lng } = geolocationPosition;
      setMapPosition([lat, lng]);
    }
  }, [geolocationPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type={ButtonType.POSITION} onClick={getPosition}>
          {isLoadingPosition ? 'Loading...' : 'Use your position'}
        </Button>
      )}

      <MapContainer 
        center={mapPosition} 
        zoom={6} 
        scrollWheelZoom={true} 
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city: City) => (
          <Marker key={city.id} position={[city.position.lat, city.position.lng]}>
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }: { position: MapPosition }): null {
  useMap().setView(position);

  return null;
}

function DetectClick(): null {
  const navigate = useNavigate();

  useMapEvents({
    click: e => {
      const { lat, lng } = e.latlng;
      navigate(`form?lat=${lat}&lng=${lng}`);
    }
  });

  return null;
}

export default Map;