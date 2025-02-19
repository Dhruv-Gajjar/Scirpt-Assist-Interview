import {
  Box,
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
import { MdSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IPeople } from "swapi-ts";
import { getPeopleById, getStarWarsData } from "../../services/api";
import { useAppStore } from "../../store/app.store";

const People: FC = () => {
  const [selectedPeople, setSelectedPeople] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const { peoples, setPeopleDetailData, setPeoplesData } = useAppStore();
  const navigate = useNavigate();
  const totalPages = Math.ceil((peoples.count || 0) / 10);
  const pagination = usePagination({ total: totalPages, initialPage: 1 });

  const { data: peoplesData, isFetching: peopleLoading } = useQuery({
    queryKey: ["people", pagination.active],
    queryFn: async () => {
      const baseUrl = "https://swapi.dev/api/people/";
      const url =
        pagination.active === 1
          ? baseUrl
          : `${baseUrl}?page=${pagination.active}`;
      const peopleData = await getStarWarsData(url);
      setPeoplesData(peopleData);
      return peopleData;
    },
    keepPreviousData: true,
    staleTime: 0.5,
    cacheTime: 5 * 60 * 1000,
    enabled: !!pagination.active,
  });

  const { isFetching: selectedPeopleLoading } = useQuery({
    queryKey: ["people", selectedPeople],
    queryFn: async () => {
      const data: IPeople = await getPeopleById(selectedPeople);
      if (data) {
        const route = selectedPeople.split("/").slice(-2)[0];
        setPeopleDetailData(data);
        navigate(`/people/${route}`);
      }
      return data;
    },
    enabled: !!selectedPeople,
    onError: (error: any) => {
      console.error("Error fetching Star Wars data:", error);
    },
  });

  const handleSelectedIndex = (url: string) => {
    setSelectedPeople(url.toString());
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value);
  };

  const filteredPeoples = useMemo(() => {
    if (!search) return (peoples.results as IPeople[]) || [];
    return (peoples.results as IPeople[]).filter((people) =>
      people.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, peoples.results]);

  const rows = (filteredPeoples as IPeople[]).map((people: IPeople, index) => (
    <tr
      style={{ cursor: "pointer" }}
      key={index}
      onClick={() => handleSelectedIndex(people.url)}
    >
      <td>
        <Text lineClamp={1}>{people.name}</Text>
      </td>
      <td>
        <Text lineClamp={1}>{people.gender}</Text>
      </td>
      <td>{people.birth_year}</td>
      <td>{people.films?.length || 0}</td>
      <td>{people.vehicles?.length || 0}</td>
      <td>
        <Text lineClamp={1}>{people.starships?.length || 0}</Text>
      </td>
    </tr>
  ));

  return (
    <>
      {peopleLoading || selectedPeopleLoading ? (
        <Center w="100vw" h="80vh">
          <Loader size="xl" />
        </Center>
      ) : (
        <Container pt={24}>
          <Flex align="center" justify="space-between">
            <Title>
              <Text weight="bold" size={"lg"}>
                Peoples
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
                <th>Name</th>
                <th>Gender</th>
                <th>Birth Year</th>
                <th>Total Films</th>
                <th>Total Vehicles</th>
                <th>Total Starship</th>
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
      )}
    </>
  );
};

export default People;
