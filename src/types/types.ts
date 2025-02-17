import {
  IFilm,
  IPeople,
  IPlanet,
  ISpecie,
  IStarship,
  IVehicle,
} from "swapi-ts";

export interface IStarWars {
  people: IPeople;
  planets: IPlanet;
  films: IFilm;
  speices: ISpecie;
  vehicles: IVehicle;
  starship: IStarship;
}

export enum STAR_WARS {
  PEOPLE = "people",
  PLANETS = "planets",
  FILMS = "films",
  SPECIES = "species",
  VEHICLES = "vehicles",
  STARSHIP = "starships",
}

export interface IStarWarsResponse {
  results:
    | IPeople[]
    | IPlanet[]
    | IFilm[]
    | ISpecie[]
    | IVehicle[]
    | IStarship[];
  count: number;
  next: string | null;
  previous: string | null;
}
