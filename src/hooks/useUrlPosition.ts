import { useSearchParams } from 'react-router-dom';

type UseUrlPositionHook = [lat: number, lng: number];

export function useUrlPosition(): UseUrlPositionHook {
  const [searchParams] = useSearchParams();
  const lat = Number(searchParams.get('lat'));
  const lng = Number(searchParams.get('lng'));

  return [lat, lng];
}