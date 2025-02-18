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
  getStarShipsByPeopleId,
  getVehiclesByPeopleId,
} from "../../services/api";
import { useAppStore } from "../../store/app.store";

const PeopleDetails: FC = () => {
  const { peopleDetail } = useAppStore();
  const { id } = useParams();

  const { data: homePlanetData, isLoading: planetLoading } = useQuery<IPlanet>({
    queryKey: ["home_planet"],
    queryFn: async (): Promise<IPlanet> => {
      const data = await getHomePlanetById(peopleDetail.homeworld.toString());
      return data;
    },
  });

  const { data: filmsData, isLoading: filmLoading } = useQuery({
    queryKey: ["people_film"],
    queryFn: () => {
      const filmPromises = peopleDetail.films.map(async (filmUrl) => {
        const film = await getFilmsById(filmUrl.toString());
        return film.title;
      });

      return Promise.all(filmPromises);
    },
  });

  const { data: vehicleData, isLoading: vehicleLoading } = useQuery({
    queryKey: ["people_vehicles"],
    queryFn: () => {
      const vehiclePromise = peopleDetail.vehicles.map(async (vehicleUrl) => {
        const vehicle = await getVehiclesByPeopleId(vehicleUrl.toString());
        return vehicle.name;
      });

      return Promise.all(vehiclePromise);
    },
  });

  const { data: starShipData, isLoading: starShipLoading } = useQuery({
    queryKey: ["people_vehicles"],
    queryFn: () => {
      const starShipPromise = peopleDetail.starships.map(
        async (starShipUrl) => {
          const starShip = await getStarShipsByPeopleId(starShipUrl.toString());
          return starShip.name;
        }
      );

      return Promise.all(starShipPromise);
    },
  });

  return (
    <Container pt={24}>
      <Title pb={18}>
        <Text>People Details</Text>
      </Title>
      {planetLoading && filmLoading && vehicleLoading && starShipLoading && (
        <Center w="100vw" h="80vh">
          <Loader size="xl" />
        </Center>
      )}
      <Flex direction="column" align="start" gap={6} justify="center">
        <Flex align="center" justify="start" gap={8} direction="row">
          <Text weight="bolder" size="lg">
            Name:
          </Text>
          <Text weight="bolder" size="lg" transform="capitalize">
            {peopleDetail.name}
          </Text>
        </Flex>
        <Flex align="center" justify="start" gap={8} direction="row">
          <Text>Birth Year:</Text>
          <Text transform="capitalize">{peopleDetail.birth_year}</Text>
        </Flex>
        <Flex align="center" justify="start" gap={8} direction="row">
          <Text>Gender:</Text>
          <Text transform="capitalize">{peopleDetail.gender}</Text>
        </Flex>
        <Flex align="center" justify="start" gap={8} direction="row">
          <Text>Height:</Text>
          <Text transform="capitalize">{peopleDetail.height}</Text>
        </Flex>
        <Flex align="center" justify="start" gap={8} direction="row">
          <Text>Hair Color:</Text>
          <Text transform="capitalize">{peopleDetail.hair_color}</Text>
        </Flex>
        <Flex align="center" justify="start" gap={8} direction="row">
          <Text>Mass:</Text>
          <Text transform="capitalize">{peopleDetail.mass} kg</Text>
        </Flex>
        <Flex align="center" justify="start" gap={8} direction="row">
          <Text>Skin Color:</Text>
          <Text transform="capitalize">{peopleDetail.skin_color}</Text>
        </Flex>
        <Flex align="center" justify="start" gap={8} direction="row">
          <Text>Eye Color:</Text>
          <Text transform="capitalize">{peopleDetail.eye_color}</Text>
        </Flex>
        <Text>Home Planet: {homePlanetData?.name}</Text>
        <Flex gap={6}>
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
          <Text>Vehicles: </Text>
          <Flex wrap={"wrap"} gap={8} align="center" justify="center">
            {vehicleData && vehicleData?.length > 0 ? (
              vehicleData.map((vehicle, index) => (
                <Badge
                  variant="gradient"
                  gradient={{ from: "teal", to: "lime", deg: 105 }}
                  p={12}
                  key={index}
                >
                  {vehicle}
                </Badge>
              ))
            ) : (
              <Text>N/A</Text>
            )}
          </Flex>
        </Flex>
        <Flex gap={6}>
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

export default PeopleDetails;
