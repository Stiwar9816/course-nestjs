import { Injectable } from '@nestjs/common';
import { BadRequestException, NotFoundException } from '@nestjs/common/exceptions';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    // {
    //   id: uuid(),
    //   brand: 'Toyota',
    //   model: 'Corolla',
    // }
  ];

  //Metodo para devolver todos los datos
  findAll() {
    return this.cars;
  }

  // Metodo para devolver un carro por el ID
  findOneById(id: string) {
    /* 
    Condición de busqueda en el array de datos 
    en el cual veririficamos que sea igual a alguno que exista en la BD
    */
    const car = this.cars.find((car) => car.id === id);

    /*
    Exception filter para comprobar si el id que se busca existe o no en los datos
    si no manda un 404 Not Found
    */
    if (!car) {
      throw new NotFoundException(`Car with id '${id}' not found`);
    }

    /* 
    En caso de no cumplirse la exception filter 
    retornara la información solicitada de la BD 
    */
    return car;
  }

  create(createCarDto: CreateCarDto) {
    const car: Car = {
      id: uuid(),
      // brand: createCarDto.brand,
      // model: createCarDto.model
      ...createCarDto
    }
    this.cars.push(car)
    return car;
  }

  update(id: string, updateCarDto: UpdateCarDto) {
    let carDB = this.findOneById(id)

    /*
    Validamos que el ID que se envie no sea igual al de la DB para poder permitir el cambio
    y si no lanzar una excepción de Bad Request
     */
    if (updateCarDto.id && updateCarDto.id !== id) {
      throw new BadRequestException(`Car id is not valid inside body`)
    }

    this.cars = this.cars.map(car => {
      if (car.id === id) {
        carDB = {
          ...carDB, // Esparcimos todas las propiedades del carDB
          ...updateCarDto, // Esparcimos todas las propiedades del updateCardDB
          id
        }
        return carDB
      }
      return car
    })
    return carDB
  }

  delete(id: string) {
    const car = this.findOneById(id) // Verificamos por el ID si el dato existe y si no manda una excepción
    this.cars = this.cars.filter(car => car.id !== id) // Devuelve los datos diferentes al ID que se manda 
  }

  fillCarsWithSeedData(cars: Car[]) {
    this.cars = cars
  }
}
