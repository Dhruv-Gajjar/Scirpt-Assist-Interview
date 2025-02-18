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
  getPlanetById,
  getSpeciesById,
  getStarShipsByPeopleId,
  getVehiclesByPeopleId,
} from "../../services/api";
import { useAppStore } from "../../store/app.store";

const FilmsDetails: FC = () => {
  const { filmDetail } = useAppStore();
  const { id } = useParams();

  const { data: planetsData, isLoading: filmLoading } = useQuery({
    queryKey: ["people_film"],
    queryFn: () => {
      const planetPromise = filmDetail.planets.map(async (planetUrl) => {
        const planet = await getPlanetById(planetUrl.toString());
        return planet.name;
      });

      return Promise.all(planetPromise);
    },
  });

  const { data: peoplesData, isLoading: peoplesLoading } = useQuery({
    queryKey: ["planets_peoples"],
    queryFn: () => {
      const peoplesPromise = filmDetail.characters.map(async (character) => {
        const people = await getPeopleById(character.toString());
        return people.name;
      });

      return Promise.all(peoplesPromise);
    },
  });

  const { data: speciesData, isLoading: specieLoading } = useQuery({
    queryKey: ["people_vehicles"],
    queryFn: () => {
      const speciesPromise = filmDetail.species.map(async (specieUrl) => {
        const specie = await getSpeciesById(specieUrl.toString());
        return specie.name;
      });

      return Promise.all(speciesPromise);
    },
  });

  const { data: vehicleData, isLoading: vehicleLoading } = useQuery({
    queryKey: ["people_vehicles"],
    queryFn: () => {
      const vehiclePromise = filmDetail.vehicles.map(async (vehicleUrl) => {
        const vehicle = await getVehiclesByPeopleId(vehicleUrl.toString());
        return vehicle.name;
      });

      return Promise.all(vehiclePromise);
    },
  });

  const { data: starShipData, isLoading: starShipLoading } = useQuery({
    queryKey: ["people_vehicles"],
    queryFn: () => {
      const starShipPromise = filmDetail.starships.map(async (starShipUrl) => {
        const starShip = await getStarShipsByPeopleId(starShipUrl.toString());
        return starShip.name;
      });

      return Promise.all(starShipPromise);
    },
  });

  return (
    <Container pt={24}>
      <Title pb={18}>
        <Text>Film Details</Text>
      </Title>
      {/* {planetLoading && filmLoading && vehicleLoading && starShipLoading && (
          <Center w="100vw" h="80vh">
            <Loader size="xl" />
          </Center>
        )} */}
      <Flex direction="column" align="start" gap={12} justify="center">
        <Flex align="center" justify="start" gap={8} direction="row">
          <Text weight="bolder" size="lg">
            Name:
          </Text>
          <Text weight="bolder" size="lg" transform="capitalize">
            {filmDetail.title}
          </Text>
        </Flex>
        <Flex align="center" justify="start" gap={8} direction="row">
          <Text>Director:</Text>
          <Text transform="capitalize">{filmDetail.director}</Text>
        </Flex>
        <Flex align="center" justify="start" gap={8} direction="row">
          <Text>Producer:</Text>
          <Text transform="capitalize">{filmDetail.producer}</Text>
        </Flex>
        <Flex align="center" justify="start" gap={8} direction="row">
          <Text>Release Date:</Text>
          <Text transform="capitalize">
            {filmDetail.release_date.toString()}
          </Text>
        </Flex>
        <Flex align="center" justify="start" gap={8} direction="row">
          <Text>Episode Id:</Text>
          <Text transform="capitalize">{filmDetail.episode_id}</Text>
        </Flex>
        <Flex gap={6} pb={12} wrap={"wrap"} w="100vw" align="center">
          <Text>Films: </Text>
          <Flex wrap={"wrap"} gap={8} align="center" justify="center">
            {planetsData && planetsData?.length > 0 ? (
              planetsData.map((planet, index) => (
                <Badge
                  variant="gradient"
                  gradient={{ from: "indigo", to: "cyan" }}
                  p={12}
                  key={index}
                >
                  {planet}
                </Badge>
              ))
            ) : (
              <Text>N/A</Text>
            )}
          </Flex>
        </Flex>
        <Flex gap={6} pb={12}>
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
        <Flex gap={6} pb={12}>
          <Text>Species: </Text>
          <Flex wrap={"wrap"} gap={8} align="center" justify="center">
            {speciesData && speciesData?.length > 0 ? (
              speciesData.map((specie, index) => (
                <Badge
                  variant="gradient"
                  gradient={{ from: "teal", to: "blue", deg: 60 }}
                  key={index}
                  p={12}
                >
                  {specie}
                </Badge>
              ))
            ) : (
              <Text>N/A</Text>
            )}
          </Flex>
        </Flex>
        <Flex gap={6} pb={12}>
          <Text>Vehicles: </Text>
          <Flex wrap={"wrap"} gap={8} align="center" justify="center">
            {vehicleData && vehicleData?.length > 0 ? (
              vehicleData.map((vehicle, index) => (
                <Badge
                  variant="gradient"
                  gradient={{ from: "orange", to: "red" }}
                  key={id}
                  p={12}
                >
                  {vehicle}
                </Badge>
              ))
            ) : (
              <Text>N/A</Text>
            )}
          </Flex>
        </Flex>
        <Flex gap={6} pb={12}>
          <Text>Star Ships: </Text>
          <Flex wrap={"wrap"} gap={8} align="center" justify="center">
            {starShipData && starShipData?.length > 0 ? (
              starShipData.map((starship, index) => (
                <Badge
                  variant="gradient"
                  gradient={{ from: "#ed6ea0", to: "#ec8c69", deg: 35 }}
                  p={12}
                  key={index}
                >
                  {starship}
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

export default FilmsDetails;
