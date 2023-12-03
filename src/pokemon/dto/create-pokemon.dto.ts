import { IsInt, IsPositive, IsString, Min, MinLength } from 'class-validator';

export class CreatePokemonDto {
  @IsInt()
  @IsPositive({ message: 'Numero positivo' })
  @Min(1, { message: 'Mayor que 0' })
  readonly no: number;

  @IsString()
  @MinLength(3)
   name: string;
}
