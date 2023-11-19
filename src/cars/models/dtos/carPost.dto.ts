import { IsOptional, IsString } from "class-validator";
import { ICar } from "../car.interface";

export class CarPost {
   
  @IsString()
   readonly name: string;
   @IsString()
   readonly brand: string;

}