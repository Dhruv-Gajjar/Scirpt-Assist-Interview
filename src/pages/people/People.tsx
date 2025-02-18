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
import { QueryClient, useQuery } from "@tanstack/react-query";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IPeople } from "swapi-ts";
import AppLoader from "../../components/AppLoader";
import { getPeopleById, getStarWarsData } from "../../services/api";
import { useAppStore } from "../../store/app.store";

const People: FC = () => {
  const [selectedPeople, setSelectedPeople] = useState<string>("");
  const [nextPage, setNextPage] = useState<string>("");
  // const [rows, setRows] = useState<JSX.Element[]>([]);

  const { peoples, setPeopleDetailData, setPeoplesData } = useAppStore();
  const navigate = useNavigate();
  const totalPages = Math.ceil((peoples.count || 0) / 10);
  const pagination = usePagination({ total: totalPages, initialPage: 1 });

  const { data: peoplesData, isLoading: peopleLoading } = useQuery({
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
    enabled: !!pagination.active,
  });

  const { isLoading: selectedPeopleLoading } = useQuery({
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

  const rows = (peoples.results as IPeople[]).map((people: IPeople, index) => (
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

  // useEffect(() => {
  //   if (peoples.results) {
  //     const tableRows = (peoples.results as IPeople[]).map(
  //       (people: IPeople, index) => (
  //         <tr
  //           style={{ cursor: "pointer" }}
  //           key={index}
  //           onClick={() => handleSelectedIndex(people.url)}
  //         >
  //           <td>
  //             <Text lineClamp={1}>{people.name}</Text>
  //           </td>
  //           <td>
  //             <Text lineClamp={1}>{people.gender}</Text>
  //           </td>
  //           <td>{people.birth_year}</td>
  //           <td>{people.films?.length || 0}</td>
  //           <td>{people.vehicles?.length || 0}</td>
  //           <td>
  //             <Text lineClamp={1}>{people.starships?.length || 0}</Text>
  //           </td>
  //         </tr>
  //       )
  //     );
  //     setRows(tableRows);
  //   }
  // }, [pagination.active, peoples.results]);

  return (
    <>
      {peopleLoading ? (
        <Center w="100vw" h="80vh">
          <Loader size="xl" />
        </Center>
      ) : (
        <Container pt={24}>
          <Title>
            <Text weight="bold" size={"lg"}>
              Peoples
            </Text>
          </Title>
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
