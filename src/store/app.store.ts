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
import { IStarWars } from "../types/types";

interface AppStoreProps {
  starWarData: IStarWars[];
  peoples: IPeople[];
  planets: IPlanet[];
  films: IFilm[];
  species: ISpecie[];
  vehicles: IVehicle[];
  starShips: IStarship[];
}

export const useAppStore = create(
  combine(
    {
      starWarsData: [] as IStarWars[],
      peoples: [] as IPeople[],
      planets: [] as IPlanet[],
      films: [] as IFilm[],
      species: [] as ISpecie[],
      vehicles: [] as IVehicle[],
      starShips: [] as IStarship[],
    },
    (set) => ({
      setStarWarData: (data: IStarWars[]) => set({ starWarsData: data }),
      setPeoplesData: (peoples: IPeople[]) => set({ peoples: peoples }),
      setPlanetsData: (palnets: IPlanet[]) => set({ planets: palnets }),
      setFilmsData: (films: IFilm[]) => set({ films: films }),
      setSpeciesData: (species: ISpecie[]) => set({ species: species }),
      setVehiclesData: (vehicles: IVehicle[]) => set({ vehicles: vehicles }),
      setStarShipData: (starShips: IStarship[]) =>
        set({ starShips: starShips }),
    })
  )
);
