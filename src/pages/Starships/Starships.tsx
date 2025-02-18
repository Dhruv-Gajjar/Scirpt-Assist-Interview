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
import { IStarship, IVehicle } from "swapi-ts";
import { getStarShipsByPeopleId, getStarWarsData } from "../../services/api";
import { useAppStore } from "../../store/app.store";

const StarShips: FC = () => {
  const [selectedStarShips, setSelectedStarShips] = useState<string>("");

  const { starShips, setStarShipData, setStarShipDetailData } = useAppStore();
  const navigate = useNavigate();
  const totalPages = Math.ceil((starShips.count || 0) / 10);
  const pagination = usePagination({ total: totalPages, initialPage: 1 });

  const { data: starSipsData, isLoading: starShipsLoading } = useQuery({
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

  const { isLoading: selectedStarShipLoading } = useQuery({
    queryKey: ["starships", selectedStarShips],
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

  const rows = (starShips.results as IStarship[])?.map(
    (starShip: IStarship, index: number) => (
      <tr
        key={index}
        style={{ cursor: "pointer" }}
        onClick={() => handleSelectedIndex(starShip.url)}
      >
        <td>{starShip?.name}</td>
        <td>{starShip?.model}</td>
        <td>
          <Text w={200}>{starShip?.manufacturer}</Text>
        </td>
        <td>{starShip?.length}</td>
        <td>
          <Text w={100}>{starShip?.max_atmosphering_speed}</Text>
        </td>
        <td>{starShip?.starship_class}</td>
      </tr>
    )
  );

  const handleSelectedIndex = (url: string) => {
    setSelectedStarShips(url.toString());
  };

  return (
    <Container pt={24}>
      <Title>
        <Text weight="bold" size={"lg"}>
          Star Ships
        </Text>
      </Title>
      <Table highlightOnHover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Model</th>
            <th>Manufacturee</th>
            <th>Length</th>
            <th>Max Speed</th>
            <th>Ship Class</th>
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
