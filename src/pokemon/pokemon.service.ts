import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PokemonService {
  private defaultLimit = this.configService.get<number>('defaultLimit');
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService,
  ) {
    console.log(configService.get<string>('mongoDb'));
  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleErrorDb(error);
    }
  }

  private handleErrorDb(error) {
    if (error.code == 11000) {
      throw new BadRequestException(
        `Pokemon ya existe ${JSON.stringify(error.keyValue)}`,
      );
      console.error(error);
      throw new InternalServerErrorException('Error interno ');
    }
  }

  findAll(paginationDto?: PaginationDto) {
    return this.pokemonModel
      .find()
      .limit(this.defaultLimit ?? 5)
      .skip(paginationDto?.offset ?? 0)
      .sort({ no: 1 })
      .select('-__v');
  }

  async findOne(searchTerm: string) {
    let pokemon: Pokemon;

    if (!isNaN(+searchTerm)) {
      pokemon = await this.pokemonModel.findOne({ no: searchTerm });
      return pokemon;
    }

    pokemon = isValidObjectId(searchTerm)
      ? await this.pokemonModel.findById(searchTerm)
      : await this.pokemonModel.findOne({ name: searchTerm });

    if (!pokemon)
      throw new NotFoundException(
        `No se encontro el pokemon por ${searchTerm}`,
      );

    return pokemon;
  }

  async update(searchTerm: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(searchTerm);

    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    }
    try {
      await pokemon.updateOne(updatePokemonDto, { new: true });
    } catch (error) {
      this.handleErrorDb(error);
    }

    return { ...pokemon.toJSON(), ...updatePokemonDto };
  }

  async remove(searchTerm: string) {
    const { deletedCount } = await this.pokemonModel.deleteOne({
      _id: searchTerm,
    });

    if (deletedCount === 0)
      throw new NotFoundException('No se encontro la entidad');
  }
}
