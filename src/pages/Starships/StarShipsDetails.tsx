import {
  Badge,
  Center,
  Container,
  Flex,
  Loader,
  Text,
  Title,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { getFilmsById, getPeopleById } from "../../services/api";
import { useAppStore } from "../../store/app.store";

const StarShipsDetails: FC = () => {
  const { starShipDetail } = useAppStore();
  const { id } = useParams();

  const { data: filmsData, isLoading: filmLoading } = useQuery({
    queryKey: ["people_film"],
    queryFn: () => {
      const filmsPromise = starShipDetail.films.map(async (filmUrl) => {
        const film = await getFilmsById(filmUrl.toString());
        return film.title;
      });

      return Promise.all(filmsPromise);
    },
  });

  const { data: peoplesData, isLoading: peoplesLoading } = useQuery({
    queryKey: ["planets_peoples"],
    queryFn: () => {
      const peoplesPromise = starShipDetail.pilots.map(async (character) => {
        const people = await getPeopleById(character.toString());
        return people.name;
      });

      return Promise.all(peoplesPromise);
    },
  });

  return (
    <Container pt={24}>
      <Title pb={18}>
        <Text>Star Ship Details</Text>
      </Title>
      {peoplesLoading && filmLoading && (
        <Center w="100vw" h="80vh">
          <Loader size="xl" />
        </Center>
      )}
      <Flex direction="column" align="start" gap={12} justify="center">
        <Flex align="center" justify="start" gap={8} direction="row">
          <Text weight="bolder" size="lg">
            Name:
          </Text>
          <Text weight="bolder" size="lg" transform="capitalize">
            {starShipDetail.name}
          </Text>
        </Flex>
        <Flex align="center" justify="start" gap={8} direction="row">
          <Text>Manufacturer:</Text>
          <Text transform="capitalize">{starShipDetail.manufacturer}</Text>
        </Flex>
        <Flex align="center" justify="start" gap={8} direction="row">
          <Text>Star Ship Class:</Text>
          <Text transform="capitalize">{starShipDetail.starship_class}</Text>
        </Flex>
        <Flex align="center" justify="start" gap={8} direction="row">
          <Text>Model:</Text>
          <Text transform="capitalize">{starShipDetail.model}</Text>
        </Flex>
        <Flex align="center" justify="start" gap={8} direction="row">
          <Text>Length:</Text>
          <Text transform="capitalize">{starShipDetail.length}</Text>
        </Flex>
        <Flex align="center" justify="start" gap={8} direction="row">
          <Text>Cargo Capacity:</Text>
          <Text transform="capitalize">{starShipDetail.cargo_capacity}</Text>
        </Flex>
        <Flex align="center" justify="start" gap={8} direction="row">
          <Text>Consumables:</Text>
          <Text transform="capitalize">{starShipDetail.consumables}</Text>
        </Flex>
        <Flex align="center" justify="start" gap={8} direction="row">
          <Text>Cost In Credits:</Text>
          <Text transform="capitalize">{starShipDetail.cost_in_credits}</Text>
        </Flex>
        <Flex align="center" justify="start" gap={8} direction="row">
          <Text>Passengers:</Text>
          <Text transform="capitalize">{starShipDetail.passengers}</Text>
        </Flex>
        <Flex align="center" justify="start" gap={8} direction="row">
          <Text>Rating:</Text>
          <Text transform="capitalize">{starShipDetail.hyperdrive_rating}</Text>
        </Flex>
        <Flex align="center" justify="start" gap={8} direction="row">
          <Text>Max Speed:</Text>
          <Text transform="capitalize">
            {starShipDetail.max_atmosphering_speed}
          </Text>
        </Flex>
        <Flex gap={6} pb={12} wrap={"wrap"} w="100vw" align="center">
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
      </Flex>
    </Container>
  );
};

export default StarShipsDetails;
