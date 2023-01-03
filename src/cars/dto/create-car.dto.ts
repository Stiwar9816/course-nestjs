import { IsString } from "class-validator";

// Validamos que la data que estamos recibiendo tenga la estructura que definimos en el DTO
export class CreateCarDto {
  @IsString()
  readonly brand: string;
  @IsString()
  readonly model: string;
}
