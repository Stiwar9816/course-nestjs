import { Car } from "src/cars/interfaces/car.interface";
import { v4 as uuid } from 'uuid';

// Información fake para cargar la DB
export const CARS_SEED: Car[] = [
    {
        id: uuid(),
        brand: 'Toyota',
        model: 'Corolla'
    },
    {
        id: uuid(),
        brand: 'Honda',
        model: 'Civic'
    },
    {
        id: uuid(),
        brand: 'Kia',
        model: 'Rio'
    },
]