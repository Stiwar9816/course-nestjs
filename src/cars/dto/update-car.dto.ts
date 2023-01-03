import { IsOptional, IsString, IsUUID } from "class-validator";

// Validamos que la data que estamos recibiendo tenga la estructura que definimos en el DTO
export class UpdateCarDto {
  @IsString()
  @IsUUID()
  @IsOptional()
  readonly id?: string;
  @IsString()
  @IsOptional()
  readonly brand?: string;
  @IsString()
  @IsOptional()
  readonly model?: string;
}
