import { useState } from "react";

interface UseGeolocationHook {
  isLoading: boolean; 
  position: Geolocation; 
  error: string | null; 
  getPosition: () => void;
}

type Geolocation = {
  lat: number;
  lng: number;
} | null;

export function useGeolocation(defaultPosition: Geolocation = null): UseGeolocationHook {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [position, setPosition] = useState<Geolocation>(defaultPosition);
  const [error, setError] = useState<string | null>(null);

  function getPosition(): void {
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }

  return { isLoading, position, error, getPosition };
}
