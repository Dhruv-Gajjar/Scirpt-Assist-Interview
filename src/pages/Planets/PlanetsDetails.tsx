import {
  Badge,
  Center,
  Container,
  Flex,
  Grid,
  Loader,
  Text,
  Title,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { IPlanet } from "swapi-ts";
import AppLoader from "../../components/AppLoader";
import {
  getFilmsById,
  getHomePlanetById,
  getPeopleById,
  getStarShipsByPeopleId,
  getVehiclesByPeopleId,
} from "../../services/api";
import { useAppStore } from "../../store/app.store";

const PlanetsDetails: FC = () => {
  const { planetDetail } = useAppStore();
  const { id } = useParams();

  //   const { data: homePlanetData, isLoading: planetLoading } = useQuery<IPlanet>({
  //     queryKey: ["home_planet"],
  //     queryFn: async (): Promise<IPlanet> => {
  //       const data = await getHomePlanetById(planetDetail.homeworld.toString());
  //       return data;
  //     },
  //   });

  const { data: filmsData, isLoading: filmLoading } = useQuery({
    queryKey: ["people_film"],
    queryFn: () => {
      const filmPromises = planetDetail.films.map(async (filmUrl) => {
        const film = await getFilmsById(filmUrl.toString());
        return film.title;
      });

      return Promise.all(filmPromises);
    },
  });

  const { data: peoplesData, isLoading: peoplesLoading } = useQuery({
    queryKey: ["planets_peoples"],
    queryFn: () => {
      const peoplesPromise = planetDetail.residents.map(async (resident) => {
        const people = await getPeopleById(resident.toString());
        return people.name;
      });

      return Promise.all(peoplesPromise);
    },
  });

  //   const { data: vehicleData, isLoading: vehicleLoading } = useQuery({
  //     queryKey: ["people_vehicles"],
  //     queryFn: () => {
  //       const vehiclePromise = planetDetail.map(async (vehicleUrl) => {
  //         const vehicle = await getVehiclesByPeopleId(vehicleUrl.toString());
  //         return vehicle.name;
  //       });

  //       return Promise.all(vehiclePromise);
  //     },
  //   });

  //   const { data: starShipData, isLoading: starShipLoading } = useQuery({
  //     queryKey: ["people_vehicles"],
  //     queryFn: () => {
  //       const starShipPromise = planetDetail.map(
  //         async (starShipUrl) => {
  //           const starShip = await getStarShipsByPeopleId(starShipUrl.toString());
  //           return starShip.name;
  //         }
  //       );

  //       return Promise.all(starShipPromise);
  //     },
  //   });

  return (
    <Container pt={24}>
      <Title pb={18}>
        <Text>Planets Details</Text>
      </Title>
      {/* {planetLoading && filmLoading && vehicleLoading && starShipLoading && (
        <Center w="100vw" h="80vh">
          <Loader size="xl" />
        </Center>
      )} */}
      <Flex direction="column" align="start" gap={6} justify="center">
        <Flex align="center" justify="start" gap={8} direction="row">
          <Text weight="bolder" size="lg">
            Name:
          </Text>
          <Text weight="bolder" size="lg" transform="capitalize">
            {planetDetail.name}
          </Text>
        </Flex>
        <Flex align="center" justify="start" gap={8} direction="row">
          <Text>Climate:</Text>
          <Text transform="capitalize">{planetDetail.climate}</Text>
        </Flex>
        <Flex align="center" justify="start" gap={8} direction="row">
          <Text>Diameter:</Text>
          <Text transform="capitalize">{planetDetail.diameter}</Text>
        </Flex>
        <Flex align="center" justify="start" gap={8} direction="row">
          <Text>Gravity:</Text>
          <Text transform="capitalize">{planetDetail.gravity}</Text>
        </Flex>
        <Flex align="center" justify="start" gap={8} direction="row">
          <Text>Orbital Period:</Text>
          <Text transform="capitalize">{planetDetail.orbital_period}</Text>
        </Flex>
        <Flex align="center" justify="start" gap={8} direction="row">
          <Text>Terrain:</Text>
          <Text transform="capitalize">{planetDetail.terrain} kg</Text>
        </Flex>
        <Flex align="center" justify="start" gap={8} direction="row">
          <Text>Rotation Period:</Text>
          <Text transform="capitalize">{planetDetail.rotation_period}</Text>
        </Flex>
        <Flex align="center" justify="start" gap={8} direction="row">
          <Text>Population:</Text>
          <Text transform="capitalize">{planetDetail.population}</Text>
        </Flex>
        <Flex gap={6} wrap={"wrap"} w="100vw" align="center">
          <Text>Films: </Text>
          <Flex wrap={"wrap"} gap={8} align="center" justify="center">
            {filmsData && filmsData?.length > 0 ? (
              filmsData.map((film, index) => (
                <Badge
                  variant="gradient"
                  gradient={{ from: "indigo", to: "cyan" }}
                  p={12}
                  key={index}
                >
                  {film}
                </Badge>
              ))
            ) : (
              <Text>N/A</Text>
            )}
          </Flex>
        </Flex>
        <Flex gap={6}>
          <Text>Peoples: </Text>
          <Flex wrap={"wrap"} gap={8} align="center" justify="center">
            {peoplesData && peoplesData?.length > 0 ? (
              peoplesData.map((people, index) => (
                <Badge
                  variant="gradient"
                  gradient={{ from: "teal", to: "lime", deg: 105 }}
                  p={12}
                  key={index}
                >
                  {people}
                </Badge>
              ))
            ) : (
              <Text>N/A</Text>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
};

export default PlanetsDetails;
