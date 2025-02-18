import {
  Center,
  Container,
  Pagination,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { usePagination } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ISpecie } from "swapi-ts";
import { getSpeciesById, getStarWarsData } from "../../services/api";
import { useAppStore } from "../../store/app.store";

const Species: FC = () => {
  const [selectedSpecie, setSelectedSpecie] = useState<string>("");

  const { species, setSpeciesData, setSpecieDetailData } = useAppStore();
  const navigate = useNavigate();
  const totalPages = Math.ceil((species.count || 0) / 10);
  const pagination = usePagination({ total: totalPages, initialPage: 1 });

  const { data: speciesData, isLoading: sepciesLoading } = useQuery({
    queryKey: ["species", pagination.active],
    queryFn: async () => {
      const baseUrl = "https://swapi.dev/api/species/";
      const url =
        pagination.active === 1
          ? baseUrl
          : `${baseUrl}?page=${pagination.active}`;
      const response = await getStarWarsData(url);
      setSpeciesData(response);
      return response;
    },
    keepPreviousData: true,
    enabled: !!pagination.active,
  });

  const { isLoading: selectedPlanetLoading } = useQuery({
    queryKey: ["people", selectedSpecie],
    queryFn: async () => {
      const data: ISpecie = await getSpeciesById(selectedSpecie);
      if (data) {
        const route = selectedSpecie.split("/").slice(-2)[0];
        setSpecieDetailData(data);
        navigate(`/species/${route}`);
      }
      return data;
    },
    enabled: !!selectedSpecie,
    onError: (error: any) => {
      console.error("Error fetching Star Wars data:", error);
    },
  });

  const rows = (species.results as ISpecie[])?.map(
    (specie: ISpecie, index: number) => (
      <tr
        key={index}
        style={{ cursor: "pointer" }}
        onClick={() => handleSelectedIndex(specie.url)}
      >
        <td>{specie?.name}</td>
        <td>{specie?.designation}</td>
        <td>{specie?.language}</td>
        <td>{specie?.average_lifespan}</td>
        <td>{specie?.average_height}</td>
        <td>{specie?.skin_colors}</td>
      </tr>
    )
  );

  const handleSelectedIndex = (url: string) => {
    setSelectedSpecie(url.toString());
  };

  return (
    <Container pt={24}>
      <Title>
        <Text weight="bold" size={"lg"}>
          Species
        </Text>
      </Title>
      <Table highlightOnHover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Designation</th>
            <th>Language</th>
            <th>Average Life Span</th>
            <th>Average Height</th>
            <th>Skin Colors</th>
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

export default Species;
