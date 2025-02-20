import {
  Badge,
  Box,
  Button,
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
import { GiInterceptorShip } from "react-icons/gi";
import { IoMdFilm, IoMdPeople, IoMdPerson } from "react-icons/io";
import { MdChevronLeft } from "react-icons/md";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import FilmDataCard from "../../components/FilmDataCard";
import PeoplesDataCard from "../../components/PeoplesDataCard";
import { getFilmsById, getPeopleById } from "../../services/api";
import { useAppStore } from "../../store/app.store";

const SpeciesDetails: FC = () => {
  const { specieDetail } = useAppStore();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "info";

  const { data: filmsData, isLoading: filmLoading } = useQuery({
    queryKey: ["species_film"],
    queryFn: () => {
      const filmsPromise = specieDetail.films.map(async (filmUrl) => {
        const film = await getFilmsById(filmUrl.toString());
        return film;
      });

      return Promise.all(filmsPromise);
    },
  });

  const { data: peoplesData, isLoading: peoplesLoading } = useQuery({
    queryKey: ["species_peoples"],
    queryFn: () => {
      const peoplesPromise = specieDetail.people.map(async (character) => {
        const people = await getPeopleById(character.toString());
        return people;
      });

      return Promise.all(peoplesPromise);
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
          <Text>Specie Details</Text>
        </Title>
        <Button
          onClick={() => navigate("/species")}
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
          <Tabs.Tab value="peoples" icon={<IoMdPeople size={22} />}>
            Peoples
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="info" pt="xs">
          <Box pt={12}>
            <Title pb={12} fz={{ base: "md", lg: "xl" }}>
              <Text>Personal Info</Text>
            </Title>
            <Flex
              fz={{ base: "sm", lg: "lg" }}
              align="center"
              justify="start"
              gap={8}
              direction="row"
            >
              <Text weight="bold">Name:</Text>
              <Text transform="capitalize">{specieDetail.name}</Text>
            </Flex>
            <Flex
              fz={{ base: "sm", lg: "lg" }}
              align="center"
              justify="start"
              gap={8}
              direction="row"
            >
              <Text weight="bold">Designation:</Text>
              <Text transform="capitalize">{specieDetail.designation}</Text>
            </Flex>
            <Flex
              fz={{ base: "sm", lg: "lg" }}
              align="center"
              justify="start"
              gap={8}
              direction="row"
            >
              <Text weight="bold">Classification:</Text>
              <Text transform="capitalize">{specieDetail.classification}</Text>
            </Flex>
            <Flex
              fz={{ base: "sm", lg: "lg" }}
              align="center"
              justify="start"
              gap={8}
              direction="row"
            >
              <Text weight="bold">Eye Color:</Text>
              <Text transform="capitalize">{specieDetail.eye_colors}</Text>
            </Flex>
            <Flex
              fz={{ base: "sm", lg: "lg" }}
              align="center"
              justify="start"
              gap={8}
              direction="row"
            >
              <Text weight="bold">Hair Color:</Text>
              <Text transform="capitalize">{specieDetail.hair_colors}</Text>
            </Flex>
            <Flex
              fz={{ base: "sm", lg: "lg" }}
              align="center"
              justify="start"
              gap={8}
              direction="row"
            >
              <Text weight="bold">Average Height:</Text>
              <Text transform="capitalize">{specieDetail.average_height}</Text>
            </Flex>
            <Flex
              fz={{ base: "sm", lg: "lg" }}
              align="center"
              justify="start"
              gap={8}
              direction="row"
            >
              <Text weight="bold">Average Life Span:</Text>
              <Text transform="capitalize">
                {specieDetail.average_lifespan}
              </Text>
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

        <Tabs.Panel value="peoples" pt="xs">
          <Box pt={12}>
            <Title pb={12} fz={{ base: "md", lg: "xl" }}>
              <Text>Peoples Info</Text>
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

export default SpeciesDetails;
