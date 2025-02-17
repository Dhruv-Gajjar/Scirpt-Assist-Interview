import {
  Box,
  Button,
  Card,
  CardSection,
  Center,
  Container,
  Flex,
  Grid,
  Image,
  Loader,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { QueryClient, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FC, useState } from "react";
import { IPeople } from "swapi-ts";
import { getStarWarsData } from "../../api/api";
import CustomButtons from "../../components/CustomButtons";
import CustomTable from "../../components/CustomTable";
import { starWarsCardData } from "../../data";
import { useAppStore } from "../../store/app.store";
import { IStarWars, IStarWarsResponse, STAR_WARS } from "../../types/types";

const Landing: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const {
    setPeoplesData,
    setPlanetsData,
    setFilmsData,
    setSpeciesData,
    setVehiclesData,
    setStarShipData,
  } = useAppStore();

  const { isLoading, error } = useQuery<IStarWarsResponse>({
    queryKey: ["starWars", selectedCategory] as const,
    queryFn: async () => {
      const data = await getStarWarsData(selectedCategory);

      if (selectedCategory.includes("people")) {
        setPeoplesData(data);
      } else if (selectedCategory.includes("planets")) {
        setPlanetsData(data);
      } else if (selectedCategory.includes("films")) {
        setFilmsData(data);
      } else if (selectedCategory.includes("species")) {
        setSpeciesData(data);
      } else if (selectedCategory.includes("vehicles")) {
        setVehiclesData(data);
      } else if (selectedCategory.includes("starships")) {
        setStarShipData(data);
      }

      return data as IStarWarsResponse;
    },
    enabled: !!selectedCategory,
    onError: (error: any) => {
      console.error("Error fetching Star Wars data:", error);
    },
  });

  const handleLinkClick = (link: string) => {
    setSelectedCategory(link);
  };

  return (
    <>
      {isLoading && selectedCategory && (
        <Center>
          <Loader size="xl" />
        </Center>
      )}

      {error && (
        <Text color="red" align="center" size="lg">
          Error loading data. Please try again later.
        </Text>
      )}

      <Container pt={24}>
        <Grid>
          {starWarsCardData.map((element) => (
            <Grid.Col span={4} key={element.id}>
              <Card
                shadow="md"
                padding="lg"
                radius="md"
                withBorder
                h={320}
                style={{ cursor: "pointer" }}
                onClick={() => handleLinkClick(element.link)}
              >
                <CardSection>
                  <Image
                    src={element.imageURL}
                    height={180}
                    alt={element.title}
                    fit="cover"
                  />
                </CardSection>
                <Box h={100} pt={8}>
                  <Text weight={"bold"}>{element.title}</Text>
                  <Text>{element.description}</Text>
                </Box>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
        {/* <CustomTable
            data={
              peoples?.results ||
              planets?.results ||
              films?.results ||
              species?.results ||
              vehicles?.results ||
              starShips?.results ||
              []
            }
          /> */}
      </Container>
    </>
  );
};

export default Landing;
