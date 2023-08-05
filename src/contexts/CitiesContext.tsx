import React, { createContext, useContext, useEffect, useReducer } from 'react';

import { City } from '../types/city';

const BASE_URL = 'http://localhost:8000';

interface CitiesProviderProps {
    children: React.ReactNode
}

interface CitiesContext {
  cities: City[];
  isLoading: boolean;
  currentCity: City;
  getCity: (id: number) => void;
  createCity: (newCity: City) => void;
  deleteCity: (id: number) => void;
}

type State = {
  cities: City[];
  isLoading: boolean;
  currentCity: City;
  error: string;
}

type Action = 
  | { type: 'loading' }
  | { type: 'cities/loaded', payload: City[] } 
  | { type: 'cities/created', payload: City }
  | { type: 'cities/deleted', payload: number }
  | { type: 'rejected', payload: string }
  | { type: 'city/loaded', payload: City }

const initialState: State = {
  cities: [],
  isLoading: false,
  currentCity: {} as City,
  error: ""
};

function reducer(state: State, action: Action): State {
  switch(action.type) {
    case 'loading':
      return { ...state, isLoading: true };

    case 'city/loaded':
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload
      }
    case 'cities/loaded':
      return {
        ...state, isLoading: false, cities: action.payload
      }
    case 'cities/created':
      return {
        ...state, 
        isLoading: false, 
        cities: [...state.cities, action.payload]
      }
    case 'cities/deleted':
      return {
        ...state, 
        isLoading: false, 
        cities: state.cities.filter((city: City) => city.id !== action.payload)
      }
    case 'rejected': 
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }

    default: throw new Error('Unknown action type');
  }
}

const CitiesContext = createContext({} as CitiesContext);

export function useCities(): CitiesContext  {
  const context = useContext(CitiesContext);

  if (context === undefined) throw new Error('CitiesContext was used outside of the CitiesProvider');

  return context;
}

export function CitiesProvider({ children }: CitiesProviderProps) {
  const [{ cities, isLoading, currentCity }, dispatch] = 
  useReducer(
    reducer, 
    initialState
  );

  useEffect(function() {
    async function fetchCities(): Promise<void> {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: 'cities/loaded', payload: data })
      } catch {
        dispatch({ type: 'rejected', payload: "There was an error loading data..."});
      }
    }
    fetchCities();
  }, []);

  async function getCity(id: number): Promise<void> {
    if (id === currentCity?.id) return;

    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: 'city/loaded', payload: data })
    } catch {
      dispatch({ type: 'rejected', payload: "There was an error loading data..."});
    } 
  }
      
  async function createCity(newCity: City): Promise<void> {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newCity)
      });
      const data = await res.json();
      dispatch({ type: 'cities/created', payload: data });
    } catch {
      dispatch({ type: 'rejected', payload: "There was an error loading data..."});
    }
  }

  async function deleteCity(id: number): Promise<void> {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, { method: "DELETE" });

      dispatch({ type: 'cities/deleted', payload: id });
    } catch {
      dispatch({ type: 'rejected', payload: "There was an error loading data..."});
    }
  }

  return (
    <CitiesContext.Provider value={{ 
      cities, 
      isLoading, 
      currentCity, 
      getCity,
      createCity,
      deleteCity 
    }}>
        {children}
    </CitiesContext.Provider>
  );
}

