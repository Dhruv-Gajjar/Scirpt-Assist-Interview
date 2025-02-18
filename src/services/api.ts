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
  return response.data;
};

export const getPeopleById = async (url: string): Promise<IPeople> => {
  const response = await axios.get(url);

  return response.data;
};

export const getPlanetById = async (url: string): Promise<IPlanet> => {
  const response = await axios.get(url);

  return response.data;
};

export const getHomePlanetById = async (url: string): Promise<IPlanet> => {
  const response = await axios.get(url);
  return response.data;
};

export const getFilmsById = async (url: string): Promise<IFilm> => {
  const response = await axios.get(url);
  return response.data;
};

export const getSpeciesById = async (url: string): Promise<ISpecie> => {
  const response = await axios.get(url);
  return response.data;
};

export const getVehiclesByPeopleId = async (url: string): Promise<IVehicle> => {
  const response = await axios.get(url);
  return response.data;
};

export const getStarShipsByPeopleId = async (
  url: string
): Promise<IStarship> => {
  const response = await axios.get(url);
  return response.data;
};
