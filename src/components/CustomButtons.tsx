import { Button } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FC } from "react";
import { useAppStore } from "../store/app.store";
import { IStarWars } from "../types/types";

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
      switch (link) {
        case "people":
          setPeoplesData(response.data);
          break;
        case "planets":
          setPlanetsData(response.data);
          break;
        case "films":
          setFilmsData(response.data);
        case "species":
          setSpeciesData(response.data);
        case "vehicles":
          setVehiclesData(response.data);
        case "starships":
          setStarShipData(response.data);
          break;
        default:
          break;
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
