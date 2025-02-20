import {
  Button,
  Center,
  Container,
  Flex,
  Input,
  Loader,
  Pagination,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { usePagination } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, FC, useMemo, useState } from "react";
import { MdChevronLeft, MdSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IPlanet } from "swapi-ts";
import { getPlanetById, getStarWarsData } from "../../services/api";
import { useAppStore } from "../../store/app.store";

const Planets: FC = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const { planets, setPlanetsData, setPlanetDetailData } = useAppStore();
  const navigate = useNavigate();
  const totalPages = Math.ceil((planets.count || 0) / 10);
  const pagination = usePagination({ total: totalPages, initialPage: 1 });

  const { data: planetData, isFetching: planetsLoading } = useQuery({
    queryKey: ["planets", pagination.active],
    queryFn: async () => {
      const baseUrl = "https://swapi.dev/api/planets/";
      const url =
        pagination.active === 1
          ? baseUrl
          : `${baseUrl}?page=${pagination.active}`;
      const response = await getStarWarsData(url);
      setPlanetsData(response);
      return response;
    },
    keepPreviousData: true,
    staleTime: 0.5,
    cacheTime: 5 * 60 * 1000,
    enabled: !!pagination.active,
  });

  const { isFetching: selectedPlanetLoading } = useQuery({
    queryKey: ["planets", selectedPlanet],
    queryFn: async () => {
      const data: IPlanet = await getPlanetById(selectedPlanet);
      if (data) {
        const route = selectedPlanet.split("/").slice(-2)[0];
        setPlanetDetailData(data);
        navigate(`/planets/${route}`);
      }
      return data;
    },
    staleTime: 0.5,
    cacheTime: 5 * 60 * 1000,
    enabled: !!selectedPlanet,
    onError: (error: any) => {
      console.error("Error fetching Star Wars data:", error);
    },
  });

  const handleSelectedIndex = (url: string) => {
    setSelectedPlanet(url.toString());
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value);
  };

  const filteredPlanets = useMemo(() => {
    if (!search) return (planets.results as IPlanet[]) || [];
    return (planets.results as IPlanet[]).filter((planet) =>
      planet.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, planets.results]);

  const rows = (filteredPlanets as IPlanet[])?.map(
    (planet: IPlanet, index: number) => (
      <tr
        key={index}
        style={{ cursor: "pointer" }}
        onClick={() => handleSelectedIndex(planet.url)}
      >
        <td>
          <Text lineClamp={1}>{planet?.name}</Text>
        </td>
        <td>
          <Text lineClamp={1}>{planet?.diameter}</Text>
        </td>
        <td>
          <Text lineClamp={1}>{planet?.climate}</Text>
        </td>
        <td>
          <Text lineClamp={1}>{planet?.gravity}</Text>
        </td>
        <td>
          <Text lineClamp={1}>{planet?.films?.length}</Text>
        </td>
        <td>
          <Text lineClamp={1}>{planet?.residents?.length}</Text>
        </td>
      </tr>
    )
  );

  return planetsLoading || selectedPlanetLoading ? (
    <Center w="100vw" h="80vh">
      <Loader size="xl" />
    </Center>
  ) : (
    <Container pt={24}>
      <Flex pb={8} justify={"end"}>
        <Button
          onClick={() => navigate("/")}
          variant="outline"
          leftIcon={<MdChevronLeft size={20} />}
        >
          Go Back
        </Button>
      </Flex>
      <Flex align="center" justify="space-between">
        <Title>
          <Text weight="bold" size={"lg"}>
            Planets
          </Text>
        </Title>
        <Input
          icon={<MdSearch scale={20} />}
          placeholder="Search"
          value={search}
          onChange={handleSearch}
        />
      </Flex>
      <Table highlightOnHover>
        <thead>
          <tr>
            <th>
              <Text lineClamp={1}>Name</Text>
            </th>
            <th>
              <Text lineClamp={1}>Diameter</Text>
            </th>
            <th>
              <Text lineClamp={1}>Climate</Text>
            </th>
            <th>
              <Text lineClamp={1}>Gravity</Text>
            </th>
            <th>
              <Text lineClamp={1}>Total Films</Text>
            </th>
            <th>
              <Text lineClamp={1}>Total Residents</Text>
            </th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      <Center py={12}>
        <Pagination
          total={totalPages}
          value={pagination.active}
          onChange={pagination.setPage}
        />
      </Center>
    </Container>
  );
};

export default Planets;
