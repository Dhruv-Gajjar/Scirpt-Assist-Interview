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
import { IStarship } from "swapi-ts";
import { getStarShipsByPeopleId, getStarWarsData } from "../../services/api";
import { useAppStore } from "../../store/app.store";

const StarShips: FC = () => {
  const [selectedStarShips, setSelectedStarShips] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const { starShips, setStarShipData, setStarShipDetailData } = useAppStore();
  const navigate = useNavigate();
  const totalPages = Math.ceil((starShips.count || 0) / 10);
  const pagination = usePagination({ total: totalPages, initialPage: 1 });

  const { data: starSipsData, isFetching: starShipsLoading } = useQuery({
    queryKey: ["starships", pagination.active],
    queryFn: async () => {
      const baseUrl = "https://swapi.dev/api/starships/";
      const url =
        pagination.active === 1
          ? baseUrl
          : `${baseUrl}?page=${pagination.active}`;
      const response = await getStarWarsData(url);
      setStarShipData(response);
      return response;
    },
    keepPreviousData: true,
    enabled: !!pagination.active,
  });

  const { isFetching: selectedStarShipLoading } = useQuery({
    queryKey: ["starship", selectedStarShips],
    queryFn: async () => {
      const data: IStarship = await getStarShipsByPeopleId(selectedStarShips);
      if (data) {
        const route = selectedStarShips.split("/").slice(-2)[0];
        setStarShipDetailData(data);
        navigate(`/starships/${route}`);
      }
      return data;
    },
    enabled: !!selectedStarShips,
    onError: (error: any) => {
      console.error("Error fetching Star Wars data:", error);
    },
  });

  const handleSelectedIndex = (url: string) => {
    setSelectedStarShips(url.toString());
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value);
  };

  const filteredStarShips = useMemo(() => {
    if (!search) return (starShips.results as IStarship[]) || [];
    return (starShips.results as IStarship[]).filter((starShip) =>
      starShip.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, starShips.results]);

  const rows = (filteredStarShips as IStarship[])?.map(
    (starShip: IStarship, index: number) => (
      <tr
        key={index}
        style={{ cursor: "pointer" }}
        onClick={() => handleSelectedIndex(starShip.url)}
      >
        <td>
          <Text lineClamp={1}>{starShip?.name}</Text>
        </td>
        <td>
          <Text lineClamp={1}>{starShip?.model}</Text>
        </td>
        <td>
          <Text lineClamp={1}>{starShip?.manufacturer}</Text>
        </td>
        <td>
          <Text lineClamp={1}>{starShip?.length}</Text>
        </td>
        <td>
          <Text lineClamp={1}>{starShip?.max_atmosphering_speed}</Text>
        </td>
      </tr>
    )
  );

  return starShipsLoading || selectedStarShipLoading ? (
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
            Star Ships
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
              <Text lineClamp={1}>Model</Text>
            </th>
            <th>
              <Text lineClamp={1}>Manufacturee</Text>
            </th>
            <th>
              <Text lineClamp={1}>Length</Text>
            </th>
            <th>
              <Text lineClamp={1}>Max Speed</Text>
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

export default StarShips;
