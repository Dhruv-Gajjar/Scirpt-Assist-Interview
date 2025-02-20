import {
  Box,
  Button,
  Card,
  Center,
  Container,
  Flex,
  Loader,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { IoMdFilm, IoMdPerson } from "react-icons/io";
import { MdChevronLeft } from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";
import FilmDataCard from "../../components/FilmDataCard";
import PeoplesDataCard from "../../components/PeoplesDataCard";
import { getFilmsById, getPeopleById } from "../../services/api";
import { useAppStore } from "../../store/app.store";

const PlanetsDetails: FC = () => {
  const { planetDetail } = useAppStore();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "info";

  const { data: filmsData, isFetching: filmLoading } = useQuery({
    queryKey: ["people_film"],
    queryFn: () => {
      const filmPromises = planetDetail.films.map(async (filmUrl) => {
        const film = await getFilmsById(filmUrl.toString());
        return film;
      });
      return Promise.all(filmPromises);
    },
    staleTime: 0.5,
    cacheTime: 5 * 60 * 1000,
  });

  const { data: peoplesData, isFetching: peoplesLoading } = useQuery({
    queryKey: ["planets_peoples"],
    queryFn: () => {
      const peoplesPromise = planetDetail.residents.map(async (resident) => {
        const people = await getPeopleById(resident.toString());
        return people;
      });

      return Promise.all(peoplesPromise);
    },
    staleTime: 0.5,
    cacheTime: 5 * 60 * 1000,
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
          <Text>Planet Details</Text>
        </Title>
        <Button
          onClick={() => navigate("/planets")}
          variant="outline"
          leftIcon={<MdChevronLeft size={20} />}
        >
          Go Back
        </Button>
      </Flex>
      <Tabs defaultValue={activeTab} onTabChange={handleTabChange}>
        <Tabs.List>
          <Tabs.Tab value="info" icon={<IoMdPerson size={22} />}>
            <Text>Info</Text>
          </Tabs.Tab>
          <Tabs.Tab value="films" icon={<IoMdFilm size={22} />}>
            Films
          </Tabs.Tab>

          <Tabs.Tab value="residents" icon={<IoMdFilm size={22} />}>
            Residents
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="info" pt="xs">
          <Box pt={12}>
            <Title pb={12} fz={{ base: "md", lg: "xl" }}>
              <Text>Planet Info</Text>
            </Title>
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
          </Box>
        </Tabs.Panel>
        <Tabs.Panel value="films" pt="xs">
          <Box pt={12}>
            <Title pb={12} fz={{ base: "md", lg: "xl" }}>
              <Text>Film Info</Text>
            </Title>
            <FilmDataCard
              isFilmDataLoading={filmLoading}
              filmsData={filmsData}
            />
          </Box>
        </Tabs.Panel>
        <Tabs.Panel value="residents" pt="xs">
          <Box pt={12}>
            <Title pb={12} fz={{ base: "md", lg: "xl" }}>
              <Text>Film Info</Text>
            </Title>
            <PeoplesDataCard
              ispeoplesDataLoading={peoplesLoading}
              peoplesData={peoplesData}
            />
          </Box>
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
};

export default PlanetsDetails;
