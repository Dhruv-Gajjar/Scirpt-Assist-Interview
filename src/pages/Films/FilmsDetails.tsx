import {
  Badge,
  Box,
  Button,
  Center,
  Container,
  Flex,
  Grid,
  Loader,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { GiInterceptorShip, GiSpaceship } from "react-icons/gi";
import { IoMdFilm, IoMdPeople, IoMdPerson, IoMdPlanet } from "react-icons/io";
import { MdChevronLeft } from "react-icons/md";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import PeoplesDataCard from "../../components/PeoplesDataCard";
import PlanetsDataCard from "../../components/PlanetsDataCard";
import SpeciesDataCard from "../../components/SpeciesDataCard";
import StarShipsDataCard from "../../components/StarShipsDataCard";
import VehiclesDataCard from "../../components/VehiclesCard";
import {
  getPeopleById,
  getPlanetById,
  getSpeciesById,
  getStarShipsByPeopleId,
  getVehiclesByPeopleId,
} from "../../services/api";
import { useAppStore } from "../../store/app.store";
import StarShipsDetails from "../Starships/StarShipsDetails";

const FilmsDetails: FC = () => {
  const { filmDetail } = useAppStore();
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "info";

  const { data: planetsData, isLoading: planetsLoading } = useQuery({
    queryKey: ["film_planets"],
    queryFn: () => {
      const planetPromise = filmDetail.planets.map(async (planetUrl) => {
        const planet = await getPlanetById(planetUrl.toString());
        return planet;
      });

      return Promise.all(planetPromise);
    },
  });

  const { data: peoplesData, isLoading: peoplesLoading } = useQuery({
    queryKey: ["film_peoples"],
    queryFn: () => {
      const peoplesPromise = filmDetail.characters.map(async (character) => {
        const people = await getPeopleById(character.toString());
        return people;
      });

      return Promise.all(peoplesPromise);
    },
  });

  const { data: speciesData, isLoading: specieLoading } = useQuery({
    queryKey: ["film_species"],
    queryFn: () => {
      const speciesPromise = filmDetail.species.map(async (specieUrl) => {
        const specie = await getSpeciesById(specieUrl.toString());
        return specie;
      });

      return Promise.all(speciesPromise);
    },
  });

  const { data: vehicleData, isLoading: vehicleLoading } = useQuery({
    queryKey: ["film_vehicles"],
    queryFn: () => {
      const vehiclePromise = filmDetail.vehicles.map(async (vehicleUrl) => {
        const vehicle = await getVehiclesByPeopleId(vehicleUrl.toString());
        return vehicle;
      });

      return Promise.all(vehiclePromise);
    },
  });

  const { data: starShipData, isLoading: starShipLoading } = useQuery({
    queryKey: ["film_star_ship"],
    queryFn: () => {
      const starShipPromise = filmDetail.starships.map(async (starShipUrl) => {
        const starShip = await getStarShipsByPeopleId(starShipUrl.toString());
        return starShip;
      });

      return Promise.all(starShipPromise);
    },
  });

  const handleTabChange = (tab: string) => {
    setSearchParams({ tab });
  };

  return (
    <Container pt={24}>
      <Flex
        align={{ base: "center" }}
        justify={{ base: "space-between" }}
        direction={{ base: "row" }}
      >
        <Title pt={16} fz={{ base: "md", lg: "xl" }} pb={18}>
          <Text>Film Details</Text>
        </Title>
        <Button
          onClick={() => navigate("/films")}
          variant="outline"
          leftIcon={<MdChevronLeft size={20} />}
        >
          Go Back
        </Button>
      </Flex>
      <Tabs defaultValue={activeTab} onTabChange={handleTabChange}>
        <Tabs.List>
          <Tabs.Tab value="info" icon={<IoMdFilm size={22} />}>
            <Text>Info</Text>
          </Tabs.Tab>
          <Tabs.Tab value="planets" icon={<IoMdPlanet size={22} />}>
            Planets
          </Tabs.Tab>
          <Tabs.Tab value="species" icon={<IoMdPeople size={22} />}>
            Species
          </Tabs.Tab>
          <Tabs.Tab value="characters" icon={<IoMdPerson size={22} />}>
            Characters
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
            <Title pb={12} fz={{ base: "md", lg: "xl" }}>
              <Text>Film Info</Text>
            </Title>
            <Flex
              fz={{ base: "sm", lg: "lg" }}
              align="center"
              justify="start"
              gap={8}
              direction="row"
            >
              <Text weight="bold">Title:</Text>
              <Text transform="capitalize">{filmDetail.title}</Text>
            </Flex>
            <Flex
              fz={{ base: "sm", lg: "lg" }}
              align="center"
              justify="start"
              gap={8}
              direction="row"
            >
              <Text weight="bold">Director:</Text>
              <Text transform="capitalize">{filmDetail.director}</Text>
            </Flex>
            <Flex
              fz={{ base: "sm", lg: "lg" }}
              align="center"
              justify="start"
              gap={8}
              direction="row"
            >
              <Text weight="bold">Producer:</Text>
              <Text transform="capitalize">{filmDetail.producer}</Text>
            </Flex>
            <Flex
              fz={{ base: "sm", lg: "lg" }}
              align="center"
              justify="start"
              gap={8}
              direction="row"
            >
              <Text weight="bold">Release Date:</Text>
              <Text transform="capitalize">
                {filmDetail.release_date.toString()}
              </Text>
            </Flex>
            <Flex
              fz={{ base: "sm", lg: "lg" }}
              align="center"
              justify="start"
              gap={8}
              direction="row"
            >
              <Text weight="bold">Episode Id:</Text>
              <Text transform="capitalize">{filmDetail.episode_id}</Text>
            </Flex>
            <Flex
              fz={{ base: "sm", lg: "lg" }}
              align="center"
              justify="start"
              gap={8}
              direction="row"
            >
              <Text weight="bold" pb={52}>
                Description:
              </Text>
              <Text pt={12} lineClamp={3} transform="capitalize">
                {filmDetail.opening_crawl}
              </Text>
            </Flex>
          </Box>
        </Tabs.Panel>
        <Tabs.Panel value="planets" pt="xs">
          <Box pt={12}>
            <Title pb={12} fz={{ base: "md", lg: "xl" }}>
              <Text>Film Info</Text>
            </Title>
            <PlanetsDataCard
              isPlanetDataLoading={planetsLoading}
              planetData={planetsData}
            />
          </Box>
        </Tabs.Panel>
        <Tabs.Panel value="species" pt="xs">
          <Box pt={12}>
            <Title pb={12} fz={{ base: "md", lg: "xl" }}>
              <Text>Species Info</Text>
            </Title>
            <SpeciesDataCard
              isSpeciesDataLoading={specieLoading}
              speciesData={speciesData}
            />
          </Box>
        </Tabs.Panel>
        <Tabs.Panel value="characters" pt="xs">
          <Box pt={12}>
            <Title pb={12} fz={{ base: "md", lg: "xl" }}>
              <Text>Characters Info</Text>
            </Title>
            <PeoplesDataCard
              ispeoplesDataLoading={peoplesLoading}
              peoplesData={peoplesData}
            />
          </Box>
        </Tabs.Panel>
        <Tabs.Panel value="vehicles" pt="xs">
          <Box pt={12}>
            <Title pb={12} fz={{ base: "md", lg: "xl" }}>
              <Text>Vehicles Info</Text>
            </Title>
            <VehiclesDataCard
              isVehicleDataLoading={vehicleLoading}
              vehicleData={vehicleData}
            />
          </Box>
        </Tabs.Panel>
        <Tabs.Panel value="starships" pt="xs">
          <Box pt={12}>
            <Title pb={12} fz={{ base: "md", lg: "xl" }}>
              <Text>Star Ships Info</Text>
            </Title>
            <StarShipsDataCard
              isStarShipDataLoading={starShipLoading}
              starShipData={starShipData}
            />
          </Box>
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
};

export default FilmsDetails;
