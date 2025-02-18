import {
  IFilm,
  IPeople,
  IPlanet,
  ISpecie,
  IStarship,
  IVehicle,
} from "swapi-ts";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IStarWars, IStarWarsResponse } from "../types/types";

interface AppStoreProps {
  starWarsData: IStarWars[];
  peoples: IStarWarsResponse;
  planets: IStarWarsResponse;
  films: IStarWarsResponse;
  species: IStarWarsResponse;
  vehicles: IStarWarsResponse;
  starShips: IStarWarsResponse;
  peopleDetail: IPeople;
  planetDetail: IPlanet;
  filmDetail: IFilm;
  specieDetail: ISpecie;
  vehicleDetail: IVehicle;
  starShipDetail: IStarship;
  setStarWarData: (data: IStarWars[]) => void;
  setPeoplesData: (peoples: IStarWarsResponse) => void;
  setPlanetsData: (planets: IStarWarsResponse) => void;
  setFilmsData: (films: IStarWarsResponse) => void;
  setSpeciesData: (species: IStarWarsResponse) => void;
  setVehiclesData: (vehicles: IStarWarsResponse) => void;
  setStarShipData: (starShips: IStarWarsResponse) => void;
  setPeopleDetailData: (people: IPeople) => void;
  setPlanetDetailData: (planet: IPlanet) => void;
  setFilmDetailData: (film: IFilm) => void;
  setSpecieDetailData: (specie: ISpecie) => void;
  setVehicleDetailData: (vehicle: IVehicle) => void;
  setStarShipDetailData: (starShip: IStarship) => void;
}

export const useAppStore = create(
  persist<AppStoreProps>(
    (set) => ({
      starWarsData: [] as IStarWars[],
      peoples: {} as IStarWarsResponse,
      planets: {} as IStarWarsResponse,
      films: {} as IStarWarsResponse,
      species: {} as IStarWarsResponse,
      vehicles: {} as IStarWarsResponse,
      starShips: {} as IStarWarsResponse,
      peopleDetail: {} as IPeople,
      planetDetail: {} as IPlanet,
      filmDetail: {} as IFilm,
      specieDetail: {} as ISpecie,
      vehicleDetail: {} as IVehicle,
      starShipDetail: {} as IStarship,
      setStarWarData: (data: IStarWars[]) => set({ starWarsData: data }),
      setPeoplesData: (peoples: IStarWarsResponse) => set({ peoples }),
      setPlanetsData: (planets: IStarWarsResponse) => set({ planets }),
      setFilmsData: (films: IStarWarsResponse) => set({ films }),
      setSpeciesData: (species: IStarWarsResponse) => set({ species }),
      setVehiclesData: (vehicles: IStarWarsResponse) => set({ vehicles }),
      setStarShipData: (starShips: IStarWarsResponse) => set({ starShips }),
      setPeopleDetailData: (people: IPeople) => set({ peopleDetail: people }),
      setPlanetDetailData: (planet: IPlanet) => set({ planetDetail: planet }),
      setFilmDetailData: (film: IFilm) => set({ filmDetail: film }),
      setSpecieDetailData: (specie: ISpecie) => set({ specieDetail: specie }),
      setVehicleDetailData: (vehicle: IVehicle) =>
        set({ vehicleDetail: vehicle }),
      setStarShipDetailData: (starShip: IStarship) =>
        set({ starShipDetail: starShip }),
    }),
    { name: "app_data", getStorage: () => sessionStorage }
  )
);
