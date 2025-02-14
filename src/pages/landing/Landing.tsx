import { Box, Button, Container, Flex, Loader, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FC } from "react";
import { IPeople } from "swapi-ts";
import CustomButtons from "../../components/CustomButtons";
import { useAppStore } from "../../store/app.store";
import { IStarWars } from "../../types/types";

const Landing: FC = () => {
  const {
    setStarWarData,
    starWarsData,
    peoples,
    planets,
    films,
    species,
    vehicles,
    starShips,
  } = useAppStore();

  const { isLoading } = useQuery({
    queryKey: ["starWarsAll"],
    queryFn: async () => {
      const response = await axios.get(import.meta.env.VITE_API_URL);
      setStarWarData(response.data);
      return response.data;
    },
  });

  return (
    <>
      {isLoading && <Loader />}
      {starWarsData && (
        <Container pt={12}>
          <Flex w={"100%"} justify="center" gap={8} align="center">
            {Object.keys(starWarsData).map((item, index) => (
              <CustomButtons key={index} link={item} />
            ))}
          </Flex>
        </Container>
      )}
    </>
  );
};

export default Landing;
