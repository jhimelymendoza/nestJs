import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { HttpClientService } from '../common/interfaces/httpClient.service';

@Injectable()
export class SeedService {
  private readonly axiosService: AxiosInstance = axios;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly httpClientService: HttpClientService,
  ) {}

  async execute() {
    try {
      await this.executedSeed();
      return 'Seed executed';
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException('No pudimos ejecutar el seed', e);
    }
  }

  private async executedSeed() {
    await this.pokemonModel.deleteMany({});

    const data = await this.httpClientService.get<IPokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );

    const pokemons: Array<{ name: string; no: number }> = [];

    for (const { name, url } of data.results) {
      const match = url.match(/\/(\d+)\/$/);
      pokemons.push({ name, no: +match[1] });
    }
    await this.pokemonModel.insertMany(pokemons);
  }
}
