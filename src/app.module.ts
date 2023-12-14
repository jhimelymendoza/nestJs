import { Module } from '@nestjs/common';

import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import * as process from 'process';
import { ConfigModule } from '@nestjs/config';
import { envConfiguration } from './config/env.config';
import { JoiValidation } from './config/joi.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfiguration],
      validationSchema: JoiValidation,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRoot(process.env.MONGO_DB, {
      dbName: process.env.NAME_DB,
    }),
    PokemonModule,
    CommonModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
