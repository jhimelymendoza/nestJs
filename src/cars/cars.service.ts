import { Injectable, NotFoundException } from '@nestjs/common';

export interface ICar{
    id:number,
    name:string,
    brand:string
}

@Injectable()
export class CarsService {
    create(car:ICar) {
    this.cars=[...this.cars,car];
    }

    private cars:Array<ICar> = [   { id: 1, name: 'Modelo A', brand: 'Marca X' },
    { id: 2, name: 'Modelo B', brand: 'Marca Y' },
    { id: 3, name: 'Modelo C', brand: 'Marca Z' },];

    public  getCarById( id :number){
        console.log({params:id})
        const car =  this.cars.find(c=>c.id===id);

        if(!car) throw new NotFoundException(`Car with id ${id} dosent exits`)

       return {car: this.cars.find(c=>c.id===id)}

    }

    public getAll(){
        return this.cars;
    }
}
