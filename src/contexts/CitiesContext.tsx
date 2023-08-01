import React, { createContext, useContext, useEffect, useState } from 'react';

import { City } from '../types/city';

const BASE_URL = 'http://localhost:8000';

interface CitiesProviderProps {
    children: React.ReactNode
}

type CitiesContextType = {
    cities: City[];
    isLoading: boolean;
}

const CitiesContext = createContext({} as CitiesContextType);

export function useCities() {
    const context = useContext(CitiesContext);

    if (context === undefined) throw new Error('CitiesContext was used outside of the CitiesProvider');

    return context;
}

export function CitiesProvider({ children }: CitiesProviderProps) {
    const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(function() {
    async function fetchCities(): Promise<void> {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("There was an error loading data...");
      } finally {
        setIsLoading(false);
      } 
    }
    fetchCities();
  }, []);

  return (
    <CitiesContext.Provider value={{ cities, isLoading }}>
        {children}
    </CitiesContext.Provider>
  )
}

