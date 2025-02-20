import {
  Box,
  Card,
  CardSection,
  Center,
  Container,
  Grid,
  Image,
  Loader,
  Text,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { starWarsCardData } from "../../data";
import { getStarWarsData } from "../../services/api";
import { useAppStore } from "../../store/app.store";
import { IStarWarsResponse } from "../../types/types";

const Landing: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const navigate = useNavigate();

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
    error,
  } = useQuery<IStarWarsResponse>({
    queryKey: ["starWars", selectedCategory],
    queryFn: async () => {
      const data: IStarWarsResponse = await getStarWarsData(selectedCategory);
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
      const route = selectedCategory.split("/").slice(-2)[0];
      navigate(route);
      return data;
    },
    enabled: !!selectedCategory,
    onError: (error: any) => {
      console.error("Error fetching Star Wars data:", error);
    },
  });

  const handleLinkClick = async (link: string) => {
    setSelectedCategory(link);
  };

  return (
    <>
      {isLoading && selectedCategory ? (
        <Center h="80vh">
          <Loader size="xl" />
          <Box component="div">
            <Text size="xl" weight="bold">
              Loading...
            </Text>
          </Box>
        </Center>
      ) : (
        <Container pt={24}>
          <Grid>
            {starWarsCardData.map((element) => (
              <Grid.Col sm={6} lg={4} key={element.id}>
                <Card
                  shadow="md"
                  padding="lg"
                  radius="md"
                  withBorder
                  h={300}
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
                    <Text color="gray.6" size="sm">
                      {element.description}
                    </Text>
                  </Box>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </Container>
      )}

      {error && (
        <Text color="red" align="center" size="lg">
          Error loading data. Please try again later.
        </Text>
      )}
    </>
  );
};

export default Landing;
