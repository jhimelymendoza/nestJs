import { Injectable, NotFoundException } from '@nestjs/common';
import { ICar } from './models/car.interface';
import {v4 as uuid} from 'uuid'

@Injectable()
export class CarsService {
    create(car:ICar) {
    this.cars=[...this.cars,car];
    }

    private cars:Array<ICar> = [   { id: uuid(), name: 'Modelo A', brand: 'Marca X' },
    { id: uuid(), name: 'Modelo B', brand: 'Marca Y' },
    { id: uuid(), name: 'Modelo C', brand: 'Marca Z' },];

    public  getCarById( id :string){
        console.log({params:id})
        const car =  this.cars.find(c=>c.id===id);

        if(!car) throw new NotFoundException(`Car with id ${id} dosent exits`)

       return {car: this.cars.find(c=>c.id===id)}

    }

    public getAll(){
        return this.cars;
    }
}
