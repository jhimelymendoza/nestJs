export interface IHttpClientService {
  get<T>(url: string): Promise<T>;
}


