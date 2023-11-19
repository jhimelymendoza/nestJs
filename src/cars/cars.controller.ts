import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Post, Put } from '@nestjs/common';
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
    getCarById(@Param('id',new ParseUUIDPipe({version:'4'})) id :string){
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
