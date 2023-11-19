import { IsOptional, IsString, IsUUID } from "class-validator";
import { ICar } from "../car.interface";

export class CarPost {
   
  @IsString()
   readonly name: string;
   @IsString()
   readonly brand: string;

}

export class CarPatch {
  @IsString()
  @IsOptional()
  @IsUUID()
  readonly id?: string

  @IsString()
  @IsOptional()
   readonly name?: string;
   @IsString()
   @IsOptional()
   readonly brand?: string;
}