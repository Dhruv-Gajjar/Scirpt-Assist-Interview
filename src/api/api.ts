import axios from "axios";
import {
  IFilm,
  IPeople,
  IPlanet,
  ISpecie,
  IStarship,
  IVehicle,
} from "swapi-ts";
import { useAppStore } from "../store/app.store";
import { IStarWarsResponse, STAR_WARS } from "../types/types";

interface IStarWarData {
  count: number;
  next: string;
  pervious: string;
  results:
    | IPeople[]
    | IPlanet[]
    | IFilm[]
    | ISpecie[]
    | IVehicle[]
    | IStarship[];
}

export const getStarWarsData = async (
  url: string
): Promise<IStarWarsResponse> => {
  const response = await axios.get(url);
  return response.data.results;
};
