import { Injectable, NotFoundException } from "@nestjs/common";
import { ICar } from "./models/car.interface";
import { v4 as uuid } from "uuid";
import { CarPatch, CarPost } from "./models/dtos/car.dto";

@Injectable()
export class CarsService {
  private cars: Array<ICar> = [
    { id: uuid(), name: "Modelo A", brand: "Marca X" },
    { id: uuid(), name: "Modelo B", brand: "Marca Y" },
    { id: uuid(), name: "Modelo C", brand: "Marca Z" },
  ];

  public getCarById(id: string): ICar {
    console.log({ params: id });
    const car = this.cars.find((c) => c.id === id);

    if (!car) throw new NotFoundException(`Car with id ${id} dosent exits`);

    return this.cars.find((c) => c.id === id);
  }

  public getAll() {
    return this.cars;
  }

  create(car: CarPost): ICar {
    const newCar = { id: uuid(), brand: car.brand, name: car.name };
    this.cars = [...this.cars, newCar];
    return newCar;
  }

  update(id: string, paylod: CarPost): ICar {
    var car = this.getCarById(id);

    car.brand = paylod.brand;
    car.name = paylod.name;

    return car;
  }

  patch(id: string, paylod: CarPatch) {
    let carDB = this.getCarById(id);

    this.cars = this.cars.map((x) => {
      if (x.id === id) {
        carDB = {
          ...carDB,
          ...x,
          id,
        };
        return carDB;
      }
      return x;
    });
  }

  delete(id: string): ICar {
    const car = this.getCarById(id);

    this.cars = this.cars.filter((x) => x.id !== id);

    return car;
  }
}
