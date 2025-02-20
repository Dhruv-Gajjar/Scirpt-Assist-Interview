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
import { IVehicle } from "swapi-ts";
import { getStarWarsData, getVehiclesByPeopleId } from "../../services/api";
import { useAppStore } from "../../store/app.store";

const Vehicles: FC = () => {
  const [selectedVehicles, setSelectedVehicles] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const { vehicles, setVehiclesData, setVehicleDetailData } = useAppStore();
  const navigate = useNavigate();
  const totalPages = Math.ceil((vehicles.count || 0) / 10);
  const pagination = usePagination({ total: totalPages, initialPage: 1 });

  const { data: vehiclesData, isFetching: vehiclesLoading } = useQuery({
    queryKey: ["vehicles", pagination.active],
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
    staleTime: 0.5,
    cacheTime: 5 * 60 * 1000,
    enabled: !!pagination.active,
  });

  const { isFetching: selectedVehicleLoading } = useQuery({
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
    staleTime: 0.5,
    cacheTime: 5 * 60 * 1000,
    enabled: !!selectedVehicles,
    onError: (error: any) => {
      console.error("Error fetching Star Wars data:", error);
    },
  });

  const handleSelectedIndex = (url: string) => {
    setSelectedVehicles(url.toString());
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value);
  };

  const filteredVehicles = useMemo(() => {
    if (!search) return (vehicles.results as IVehicle[]) || [];
    return (vehicles.results as IVehicle[]).filter((vehicle) =>
      vehicle.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, vehicles.results]);

  const rows = (filteredVehicles as IVehicle[])?.map(
    (vehicle: IVehicle, index: number) => (
      <tr
        key={index}
        style={{ cursor: "pointer" }}
        onClick={() => handleSelectedIndex(vehicle.url)}
      >
        <td>
          <Text lineClamp={1}>{vehicle?.name}</Text>
        </td>
        <td>
          <Text lineClamp={1}>{vehicle?.model}</Text>
        </td>
        <td>
          <Text lineClamp={1}>{vehicle?.manufacturer}</Text>
        </td>
        <td>
          <Text lineClamp={1}>{vehicle?.length}</Text>
        </td>
        <td>
          <Text lineClamp={1}>{vehicle?.passengers}</Text>
        </td>
        <td>
          <Text lineClamp={1}>{vehicle?.cargo_capacity}</Text>
        </td>
      </tr>
    )
  );

  return vehiclesLoading || selectedVehicleLoading ? (
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
            Vehicles
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
