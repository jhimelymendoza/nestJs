import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { log } from 'console';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {

    
    constructor(private readonly carsService:CarsService) {
        

    }
   
    @Get()
    getAllCars(){ 
        return this.carsService.getAll();
    }

    @Get(':id')
    getCarById(@Param('id',ParseIntPipe) id :number){
        console.log({params:id})
       return this.carsService.getCarById(id);

    }

    @Post()
    create(@Body() paylod:any){
     return paylod;
    }

    @Put(':id')
    update(@Param('id',ParseIntPipe) id:number,@Body() paylod:any){
     return paylod;
    }

    @Delete(':id')
    delete(@Param('id',ParseIntPipe) id:number){
     return id;
    }
}
