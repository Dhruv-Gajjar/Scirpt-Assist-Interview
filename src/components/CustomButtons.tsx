import { Button, Tabs } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FC } from "react";
import { MdPeople } from "react-icons/md";
import { useAppStore } from "../store/app.store";
import { IStarWars, STAR_WARS } from "../types/types";

interface CustomButtonProps {
  link: string;
}

const CustomButtons: FC<CustomButtonProps> = ({ link }) => {
  const {
    setPeoplesData,
    setPlanetsData,
    setFilmsData,
    setSpeciesData,
    setVehiclesData,
    setStarShipData,
  } = useAppStore();
  const {
    data: responseData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["starWarsSingle"],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/${link}`
      );

      if (link === STAR_WARS.PEOPLE) {
        setPeoplesData(response.data);
        setPlanetsData([]);
        setFilmsData([]);
        setSpeciesData([]);
        setVehiclesData([]);
        setStarShipData([]);
      } else if (link === STAR_WARS.PLANETS) {
        setPlanetsData(response.data);
        setPeoplesData([]);
        setFilmsData([]);
        setSpeciesData([]);
        setVehiclesData([]);
        setStarShipData([]);
      } else if (link === STAR_WARS.FILMS) {
        setFilmsData(response.data);
        setPeoplesData([]);
        setPlanetsData([]);
        setSpeciesData([]);
        setVehiclesData([]);
        setStarShipData([]);
      } else if (link === STAR_WARS.SPECIES) {
        setSpeciesData(response.data);
        setPeoplesData([]);
        setPlanetsData([]);
        setFilmsData([]);
        setVehiclesData([]);
        setStarShipData([]);
      } else if (link === STAR_WARS.VEHICLES) {
        setVehiclesData(response.data);
        setPeoplesData([]);
        setPlanetsData([]);
        setFilmsData([]);
        setSpeciesData([]);
        setStarShipData([]);
      } else if (link === STAR_WARS.STARSHIP) {
        setStarShipData(response.data);
        setPeoplesData([]);
        setPlanetsData([]);
        setFilmsData([]);
        setSpeciesData([]);
        setVehiclesData([]);
      }

      return response.data.results;
    },
    enabled: false,
  });
  const handleLinkClick = () => {
    refetch();
  };

  return <Button onClick={handleLinkClick}>{link}</Button>;
};

export default CustomButtons;
