import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class SeedService {
  private readonly axiosService: AxiosInstance = axios;
  async execute() {
    const { data } = await this.axiosService.get<IPokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );

    const pokemons: Array<{ name: string; no: number }> = [];

    data.results.forEach(({ name, url }) => {
      const match = url.match(/\/(\d+)\/$/);
      pokemons.push({ name, no: +match[1] });
    });
    console.log(pokemons);
    return data;
  }
}
