import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Put,
  Patch,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { log } from "console";
import { CarsService } from "./cars.service";
import { CarPatch, CarPost } from "./models/dtos/car.dto";

@Controller("cars")
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  getAllCars() {
    return this.carsService.getAll();
  }

  @Get(":id")
  getCarById(@Param("id", new ParseUUIDPipe({ version: "4" })) id: string) {
    console.log({ params: id });
    return this.carsService.getCarById(id);
  }

  @Post()
  create(@Body() paylod: CarPost) {
    const car = this.carsService.create(paylod);
    return car;
  }

  @Put(":id")
  update(
    @Param("id", new ParseUUIDPipe({ version: "4" })) id: string,
    @Body() paylod: CarPost,
  ) {
    const car = this.carsService.update(id, paylod);
    return car;
  }


  @Patch(":id")
  updatePatch(
    @Param("id", new ParseUUIDPipe({ version: "4" })) id: string,
    @Body() paylod: CarPatch,
  ) {
    this.carsService.patch(id, paylod);
    return paylod;
  }

  @Delete(":id")
  delete(@Param("id", new ParseUUIDPipe({ version: "4" })) id: string) {
    const car = this.carsService.delete(id);
    return car;
  }
}
