import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto, UpdateCarDto } from './dto';

@Controller('cars')
export class CarsController {
  //Inyección de dependencia del servicio que manejara la logica con los datos de la aplicación
  constructor(private readonly carsService: CarsService) { }

  //Obtener todos los datos
  @Get()
  getAllCars() {
    return this.carsService.findAll();
  }

  //Obtener un dato especifico por el ID
  @Get(':id')
  getCarbyId(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    console.log({ id: +id });
    return this.carsService.findOneById(id);
  }

  @Post()
  createCar(@Body() createCarDto: CreateCarDto) {
    return this.carsService.create(createCarDto);
  }

  @Patch(':id')
  updateCar(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carsService.update(id, updateCarDto);
  }

  @Delete(':id')
  deleteCar(@Param('id', ParseUUIDPipe) id: string) {
    return this.carsService.delete(id)
  }
}
