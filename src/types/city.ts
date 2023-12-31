export type City = {
    cityName: string;
    country: string;
    emoji: string;
    date: Date;
    notes: string;
    position: {
        lat: number;
        lng: number;
    };
    id?: number;
}

export type MapPosition = [lat: number, lng: number];