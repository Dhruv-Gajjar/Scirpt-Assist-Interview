import {
  IFilm,
  IPeople,
  IPlanet,
  ISpecie,
  IStarship,
  IVehicle,
} from "swapi-ts";
import { create } from "zustand";
import { combine } from "zustand/middleware";
import { IStarWars, IStarWarsResponse } from "../types/types";

interface AppStoreProps {
  starWarData: IStarWars[];
  peoples: IStarWarsResponse;
  planets: IStarWarsResponse;
  films: IStarWarsResponse;
  species: IStarWarsResponse;
  vehicles: IStarWarsResponse;
  starShips: IStarWarsResponse;
}

export const useAppStore = create(
  combine(
    {
      starWarsData: [] as IStarWars[],
      peoples: {} as IStarWarsResponse,
      planets: {} as IStarWarsResponse,
      films: {} as IStarWarsResponse,
      species: {} as IStarWarsResponse,
      vehicles: {} as IStarWarsResponse,
      starShips: {} as IStarWarsResponse,
    },
    (set) => ({
      setStarWarData: (data: IStarWars[]) => set({ starWarsData: data }),
      setPeoplesData: (peoples: IStarWarsResponse) => set({ peoples: peoples }),
      setPlanetsData: (palnets: IStarWarsResponse) => set({ planets: palnets }),
      setFilmsData: (films: IStarWarsResponse) => set({ films: films }),
      setSpeciesData: (species: IStarWarsResponse) => set({ species: species }),
      setVehiclesData: (vehicles: IStarWarsResponse) =>
        set({ vehicles: vehicles }),
      setStarShipData: (starShips: IStarWarsResponse) =>
        set({ starShips: starShips }),
    })
  )
);
