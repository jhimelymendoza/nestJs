import { IHttpClientService } from './httpClient.interface';
import { Promise } from 'mongoose';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
@Injectable()
export class HttpClientService implements IHttpClientService {
  private readonly axiosService: AxiosInstance = axios;
  async get<T>(url: string): Promise<T> {
    try {
      return (await this.axiosService.get<T>(url)).data;
    } catch (e) {
      throw new InternalServerErrorException('No pudimos hacer la peticion');
    }
  }
}
