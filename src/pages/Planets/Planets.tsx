import {
  Box,
  Center,
  Container,
  Loader,
  Pagination,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { usePagination } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IPeople, IPlanet } from "swapi-ts";
import {
  getPeopleById,
  getPlanetById,
  getStarWarsData,
} from "../../services/api";
import { useAppStore } from "../../store/app.store";

const Planets: FC = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<string>("");

  const { planets, setPlanetsData, setPlanetDetailData } = useAppStore();
  const navigate = useNavigate();
  const totalPages = Math.ceil((planets.count || 0) / 10);
  const pagination = usePagination({ total: totalPages, initialPage: 1 });

  const { data: planetData, isLoading: planetsLoading } = useQuery({
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
    enabled: !!pagination.active,
  });

  const { isLoading: selectedPlanetLoading } = useQuery({
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
    enabled: !!selectedPlanet,
    onError: (error: any) => {
      console.error("Error fetching Star Wars data:", error);
    },
  });

  const rows = (planets.results as IPlanet[])?.map(
    (planet: IPlanet, index: number) => (
      <tr
        key={index}
        style={{ cursor: "pointer" }}
        onClick={() => handleSelectedIndex(planet.url)}
      >
        <td>{planet?.name}</td>
        <td>{planet?.diameter}</td>
        <td>{planet?.climate}</td>
        <td>{planet?.gravity}</td>
        <td>{planet?.films?.length}</td>
      </tr>
    )
  );

  const handleSelectedIndex = (url: string) => {
    setSelectedPlanet(url.toString());
  };

  return planetsLoading ? (
    <Center>
      <Loader size="xl" />
    </Center>
  ) : (
    <Container pt={24}>
      <Title>
        <Text weight="bold" size={"lg"}>
          Planets
        </Text>
      </Title>
      <Table highlightOnHover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Total Films</th>
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
