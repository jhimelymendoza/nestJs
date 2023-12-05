interface IPokeResponse {
  count: number;
  next: string;
  previous?: any;
  results: IPokemon[];
}
interface IPokemon {
  name: string;
  url: string;
}
