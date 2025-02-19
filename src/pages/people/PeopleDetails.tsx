import {
  Box,
  Card,
  Center,
  Container,
  Flex,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { FC, useState } from "react";
import { GiInterceptorShip, GiSpaceship } from "react-icons/gi";
import { IoMdFilm, IoMdPerson, IoMdPlanet } from "react-icons/io";
import { useParams, useSearchParams } from "react-router-dom";
import { IPlanet, IVehicle } from "swapi-ts";
import FilmDataCard from "../../components/FilmDataCard";
import StarShipsDataCard from "../../components/StarShipsDataCard";
import VehiclesDataCard from "../../components/VehiclesCard";
import {
  getFilmsById,
  getHomePlanetById,
  getStarShipsByPeopleId,
  getVehiclesByPeopleId,
} from "../../services/api";
import { useAppStore } from "../../store/app.store";
import { theme } from "../../theme";

const PeopleDetails: FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const { peopleDetail } = useAppStore();
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "info";

  const { data: homePlanetData, isFetching: planetLoading } = useQuery<IPlanet>(
    {
      queryKey: ["home_planet"],
      queryFn: async (): Promise<IPlanet> => {
        const data = await getHomePlanetById(peopleDetail.homeworld.toString());
        return data;
      },
      staleTime: 0.5,
      cacheTime: 5 * 60 * 1000,
    }
  );

  const { data: filmsData, isFetching: filmLoading } = useQuery({
    queryKey: ["people_film"],
    queryFn: () => {
      const filmPromises = peopleDetail.films.map(async (filmUrl) => {
        const film = await getFilmsById(filmUrl.toString());
        return film;
      });

      return Promise.all(filmPromises);
    },
    staleTime: 0.5,
    cacheTime: 5 * 60 * 1000,
  });

  const { data: vehicleData, isFetching: vehicleLoading } = useQuery({
    queryKey: ["people_vehicles"],
    queryFn: () => {
      const vehiclePromise = peopleDetail.vehicles.map(async (vehicleUrl) => {
        const vehicle: IVehicle = await getVehiclesByPeopleId(
          vehicleUrl.toString()
        );
        return vehicle;
      });

      return Promise.all(vehiclePromise);
    },
    staleTime: 0.5,
    cacheTime: 5 * 60 * 1000,
  });

  const { data: starShipData, isFetching: starShipLoading } = useQuery({
    queryKey: ["people_vehicles"],
    queryFn: () => {
      const starShipPromise = peopleDetail.starships.map(
        async (starShipUrl) => {
          const starShip = await getStarShipsByPeopleId(starShipUrl.toString());
          return starShip;
        }
      );

      return Promise.all(starShipPromise);
    },
    staleTime: 0.5,
    cacheTime: 5 * 60 * 1000,
  });

  const handleTabChange = (tab: string) => {
    setSearchParams({ tab });
  };

  return (
    <Container pt={24}>
      <Title pb={18}>
        <Text>People Details</Text>
      </Title>
      <Tabs defaultValue={activeTab} onTabChange={handleTabChange}>
        <Tabs.List>
          <Tabs.Tab value="info" icon={<IoMdPerson size={22} />}>
            <Text>Info</Text>
          </Tabs.Tab>
          <Tabs.Tab value="homeworld" icon={<IoMdPlanet size={22} />}>
            HomeWorld
          </Tabs.Tab>
          <Tabs.Tab value="films" icon={<IoMdFilm size={22} />}>
            Films
          </Tabs.Tab>
          <Tabs.Tab value="vehicles" icon={<GiInterceptorShip size={22} />}>
            Vehicles
          </Tabs.Tab>
          <Tabs.Tab value="starships" icon={<GiSpaceship size={22} />}>
            StarShips
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="info" pt="xs">
          <Box pt={12}>
            <Title>
              <Text>Personal Information</Text>
            </Title>
            <Flex align="center" justify="start" gap={8} direction="row">
              <Text weight="bold">Name:</Text>
              <Text transform="capitalize">{peopleDetail.name}</Text>
            </Flex>
            <Flex align="center" justify="start" gap={8} direction="row">
              <Text weight="bold">Birth Year:</Text>
              <Text transform="capitalize">{peopleDetail.birth_year}</Text>
            </Flex>
            <Flex align="center" justify="start" gap={8} direction="row">
              <Text weight="bold">Gender:</Text>
              <Text transform="capitalize">{peopleDetail.gender}</Text>
            </Flex>
            <Flex align="center" justify="start" gap={8} direction="row">
              <Text weight="bold">Height:</Text>
              <Text transform="capitalize">{peopleDetail.height}</Text>
            </Flex>
            <Flex align="center" justify="start" gap={8} direction="row">
              <Text weight="bold">Hair Color:</Text>
              <Text transform="capitalize">{peopleDetail.hair_color}</Text>
            </Flex>
            <Flex align="center" justify="start" gap={8} direction="row">
              <Text weight="bold">Mass:</Text>
              <Text transform="capitalize">{peopleDetail.mass} kg</Text>
            </Flex>
            <Flex align="center" justify="start" gap={8} direction="row">
              <Text weight="bold">Skin Color:</Text>
              <Text transform="capitalize">{peopleDetail.skin_color}</Text>
            </Flex>
            <Flex align="center" justify="start" gap={8} direction="row">
              <Text weight="bold">Eye Color:</Text>
              <Text transform="capitalize">{peopleDetail.eye_color}</Text>
            </Flex>
          </Box>
        </Tabs.Panel>

        <Tabs.Panel value="homeworld" pt="xs">
          <Box pt={12}>
            <Title>
              <Text>Homeworld Info</Text>
            </Title>
            <Flex align="center" justify="start" gap={8} direction="row">
              <Text weight="bold">Name:</Text>
              <Text transform="capitalize">{homePlanetData?.name}</Text>
            </Flex>
            <Flex align="center" justify="start" gap={8} direction="row">
              <Text weight="bold">Climate:</Text>
              <Text transform="capitalize">{homePlanetData?.climate}</Text>
            </Flex>
            <Flex align="center" justify="start" gap={8} direction="row">
              <Text weight="bold">Diameter:</Text>
              <Text transform="capitalize">{homePlanetData?.diameter}</Text>
            </Flex>
            <Flex align="center" justify="start" gap={8} direction="row">
              <Text weight="bold">Gravity:</Text>
              <Text transform="capitalize">{homePlanetData?.gravity}</Text>
            </Flex>
            <Flex align="center" justify="start" gap={8} direction="row">
              <Text weight="bold">Population:</Text>
              <Text transform="capitalize">{homePlanetData?.population}</Text>
            </Flex>
            <Flex align="center" justify="start" gap={8} direction="row" pb={8}>
              <Text weight="bold">Surface Water:</Text>
              <Text transform="capitalize">
                {homePlanetData?.surface_water}
              </Text>
            </Flex>
          </Box>
        </Tabs.Panel>

        <Tabs.Panel value="films" pt="xs">
          <Box pt={12}>
            <Title>
              <Text>Film Info</Text>
            </Title>
            <FilmDataCard filmsData={filmsData} />
          </Box>
        </Tabs.Panel>

        <Tabs.Panel value="vehicles" pt="xs">
          <Box pt={12}>
            <Title>
              <Text>Vehicle Info</Text>
            </Title>
            <VehiclesDataCard vehicleData={vehicleData} />
          </Box>
        </Tabs.Panel>

        <Tabs.Panel value="starships" pt="xs">
          <Box pt={12}>
            <Title>
              <Text>Star Ships Info</Text>
            </Title>
            <StarShipsDataCard starShipData={starShipData} />
          </Box>
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
};

export default PeopleDetails;
