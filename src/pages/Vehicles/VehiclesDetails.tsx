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
import { useNavigate, useSearchParams } from "react-router-dom";
import FilmDataCard from "../../components/FilmDataCard";
import PeoplesDataCard from "../../components/PeoplesDataCard";
import { getFilmsById, getPeopleById } from "../../services/api";
import { useAppStore } from "../../store/app.store";

const VehiclesDetails: FC = () => {
  const { vehicleDetail } = useAppStore();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "info";

  const { data: filmsData, isLoading: filmLoading } = useQuery({
    queryKey: ["vehicles_film"],
    queryFn: () => {
      const filmsPromise = vehicleDetail.films.map(async (filmUrl) => {
        const film = await getFilmsById(filmUrl.toString());
        return film;
      });

      return Promise.all(filmsPromise);
    },
    staleTime: 0.5,
    cacheTime: 5 * 60 * 1000,
  });

  const { data: peoplesData, isLoading: peoplesLoading } = useQuery({
    queryKey: ["vehicles_peoples"],
    queryFn: () => {
      const peoplesPromise = vehicleDetail.pilots.map(async (character) => {
        const people = await getPeopleById(character.toString());
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
          <Text>People Details</Text>
        </Title>
        <Button
          onClick={() => navigate("/vehicles")}
          variant="outline"
          leftIcon={<MdChevronLeft size={20} />}
        >
          Go Back
        </Button>
      </Flex>
      <Tabs defaultValue={activeTab} onTabChange={handleTabChange}>
        <Tabs.List>
          <Tabs.Tab value="info" icon={<GiInterceptorShip size={22} />}>
            <Text>Info</Text>
          </Tabs.Tab>
          <Tabs.Tab value="films" icon={<IoMdFilm size={22} />}>
            Films
          </Tabs.Tab>
          <Tabs.Tab value="pilots" icon={<IoMdPeople size={22} />}>
            Pilots
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="info" pt="xs">
          <Box pt={12}>
            <Title pb={12} fz={{ base: "md", lg: "xl" }}>
              <Text>Vehicle Info</Text>
            </Title>
            <Flex
              fz={{ base: "sm", lg: "lg" }}
              align="center"
              justify="start"
              gap={8}
              direction="row"
            >
              <Text weight="bold">Name:</Text>
              <Text transform="capitalize">{vehicleDetail.name}</Text>
            </Flex>
            <Flex
              fz={{ base: "sm", lg: "lg" }}
              align="center"
              justify="start"
              gap={8}
              direction="row"
            >
              <Text weight="bold">Manufacturer:</Text>
              <Text transform="capitalize">{vehicleDetail.manufacturer}</Text>
            </Flex>
            <Flex
              fz={{ base: "sm", lg: "lg" }}
              align="center"
              justify="start"
              gap={8}
              direction="row"
            >
              <Text weight="bold">Vehicle Class:</Text>
              <Text transform="capitalize">{vehicleDetail.vehicle_class}</Text>
            </Flex>
            <Flex
              fz={{ base: "sm", lg: "lg" }}
              align="center"
              justify="start"
              gap={8}
              direction="row"
            >
              <Text weight="bold">Model:</Text>
              <Text transform="capitalize">{vehicleDetail.model}</Text>
            </Flex>
            <Flex
              fz={{ base: "sm", lg: "lg" }}
              align="center"
              justify="start"
              gap={8}
              direction="row"
            >
              <Text weight="bold">Length:</Text>
              <Text transform="capitalize">{vehicleDetail.length}</Text>
            </Flex>
            <Flex
              fz={{ base: "sm", lg: "lg" }}
              align="center"
              justify="start"
              gap={8}
              direction="row"
            >
              <Text weight="bold">Cargo Capacity:</Text>
              <Text transform="capitalize">{vehicleDetail.cargo_capacity}</Text>
            </Flex>
            <Flex
              fz={{ base: "sm", lg: "lg" }}
              align="center"
              justify="start"
              gap={8}
              direction="row"
            >
              <Text weight="bold">Consumables:</Text>
              <Text transform="capitalize">{vehicleDetail.consumables}</Text>
            </Flex>
            <Flex
              fz={{ base: "sm", lg: "lg" }}
              align="center"
              justify="start"
              gap={8}
              direction="row"
            >
              <Text weight="bold">Cost In Credits:</Text>
              <Text transform="capitalize">
                {vehicleDetail.cost_in_credits}
              </Text>
            </Flex>
            <Flex
              fz={{ base: "sm", lg: "lg" }}
              align="center"
              justify="start"
              gap={8}
              direction="row"
            >
              <Text weight="bold">Passengers:</Text>
              <Text transform="capitalize">{vehicleDetail.passengers}</Text>
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

        <Tabs.Panel value="pilots" pt="xs">
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

export default VehiclesDetails;
