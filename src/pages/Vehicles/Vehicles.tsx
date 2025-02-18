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
import { IPlanet, IVehicle } from "swapi-ts";
import { getStarWarsData, getVehiclesByPeopleId } from "../../services/api";
import { useAppStore } from "../../store/app.store";

const Vehicles: FC = () => {
  const [selectedVehicles, setSelectedVehicles] = useState<string>("");

  const { vehicles, setVehiclesData, setVehicleDetailData } = useAppStore();
  const navigate = useNavigate();
  const totalPages = Math.ceil((vehicles.count || 0) / 10);
  const pagination = usePagination({ total: totalPages, initialPage: 1 });

  const { data: vehiclesData, isLoading: vehiclesLoading } = useQuery({
    queryKey: ["vehicle", pagination.active],
    queryFn: async () => {
      const baseUrl = "https://swapi.dev/api/vehicles/";
      const url =
        pagination.active === 1
          ? baseUrl
          : `${baseUrl}?page=${pagination.active}`;
      const response = await getStarWarsData(url);
      setVehiclesData(response);
      return response;
    },
    keepPreviousData: true,
    enabled: !!pagination.active,
  });

  const { isLoading: selectedVehicleLoading } = useQuery({
    queryKey: ["vehicle", selectedVehicles],
    queryFn: async () => {
      const data: IVehicle = await getVehiclesByPeopleId(selectedVehicles);
      if (data) {
        const route = selectedVehicles.split("/").slice(-2)[0];
        setVehicleDetailData(data);
        navigate(`/vehicles/${route}`);
      }
      return data;
    },
    enabled: !!selectedVehicles,
    onError: (error: any) => {
      console.error("Error fetching Star Wars data:", error);
    },
  });

  const rows = (vehicles.results as IVehicle[])?.map(
    (vehicle: IVehicle, index: number) => (
      <tr
        key={index}
        style={{ cursor: "pointer" }}
        onClick={() => handleSelectedIndex(vehicle.url)}
      >
        <td>{vehicle?.name}</td>
        <td>{vehicle?.model}</td>
        <td>
          <Text w={200}>{vehicle?.manufacturer}</Text>
        </td>
        <td>{vehicle?.length}</td>
        <td>{vehicle?.passengers}</td>
        <td>{parseInt(vehicle?.cargo_capacity).toFixed(2)}</td>
      </tr>
    )
  );

  const handleSelectedIndex = (url: string) => {
    setSelectedVehicles(url.toString());
  };

  return (
    <Container pt={24}>
      <Title>
        <Text weight="bold" size={"lg"}>
          Vehicles
        </Text>
      </Title>
      <Table highlightOnHover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Model</th>
            <th>Manufacturer</th>
            <th>Length</th>
            <th>Passenger</th>
            <th>Cargo Capicity</th>
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

export default Vehicles;
