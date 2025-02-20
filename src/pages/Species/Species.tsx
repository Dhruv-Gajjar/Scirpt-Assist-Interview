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
import { ISpecie } from "swapi-ts";
import { getSpeciesById, getStarWarsData } from "../../services/api";
import { useAppStore } from "../../store/app.store";

const Species: FC = () => {
  const [selectedSpecie, setSelectedSpecie] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const { species, setSpeciesData, setSpecieDetailData } = useAppStore();
  const navigate = useNavigate();
  const totalPages = Math.ceil((species.count || 0) / 10);
  const pagination = usePagination({ total: totalPages, initialPage: 1 });

  const { data: speciesData, isFetching: speciesLoading } = useQuery({
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
    staleTime: 0.5,
    cacheTime: 5 * 60 * 1000,
    enabled: !!pagination.active,
  });

  const { isFetching: selectedSpecieLoading } = useQuery({
    queryKey: ["specie", selectedSpecie],
    queryFn: async () => {
      const data: ISpecie = await getSpeciesById(selectedSpecie);
      if (data) {
        const route = selectedSpecie.split("/").slice(-2)[0];
        setSpecieDetailData(data);
        navigate(`/species/${route}`);
      }
      return data;
    },
    staleTime: 0.5,
    cacheTime: 5 * 60 * 1000,
    enabled: !!selectedSpecie,
    onError: (error: any) => {
      console.error("Error fetching Star Wars data:", error);
    },
  });

  const handleSelectedIndex = (url: string) => {
    setSelectedSpecie(url.toString());
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value);
  };

  const filteredSpeceis = useMemo(() => {
    if (!search) return (species.results as ISpecie[]) || [];
    return (species.results as ISpecie[]).filter((specie) =>
      specie.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, species.results]);

  const rows = (filteredSpeceis as ISpecie[])?.map(
    (specie: ISpecie, index: number) => (
      <tr
        key={index}
        style={{ cursor: "pointer" }}
        onClick={() => handleSelectedIndex(specie.url)}
      >
        <td>
          <Text lineClamp={1}>{specie?.name}</Text>
        </td>
        <td>
          <Text lineClamp={1}>{specie?.designation}</Text>
        </td>
        <td>
          <Text lineClamp={1}>{specie?.language}</Text>
        </td>
        <td>
          <Text lineClamp={1}>{specie?.average_lifespan}</Text>
        </td>
        <td>
          <Text lineClamp={1}>{specie?.average_height}</Text>
        </td>
        <td>
          <Text lineClamp={1}>{specie?.skin_colors}</Text>
        </td>
      </tr>
    )
  );

  return speciesLoading || selectedSpecieLoading ? (
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
            Species
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
              <Text lineClamp={1}>Designation</Text>
            </th>
            <th>
              <Text lineClamp={1}>Language</Text>
            </th>
            <th>
              <Text lineClamp={1}>Average Life Span</Text>
            </th>
            <th>
              <Text lineClamp={1}>Average Height</Text>
            </th>
            <th>
              <Text lineClamp={1}>Skin Colors</Text>
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

export default Species;
