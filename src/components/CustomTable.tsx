import {
  Box,
  Center,
  Flex,
  Group,
  Pagination,
  Table,
  Text,
} from "@mantine/core";
import React, { FC } from "react";
import {
  IFilm,
  IPeople,
  IPlanet,
  ISpecie,
  IStarship,
  IVehicle,
} from "swapi-ts";
import { IStarWars } from "../types/types";

interface CustomTableProps {
  data: IPeople[] | IPlanet[] | IFilm[] | IVehicle[] | ISpecie[] | IStarship[];
}

const CustomTable: FC<CustomTableProps> = ({ data }) => {
  console.log("DATA: ", data);
  const rows = data?.map((element) => (
    <tr key={element?.name}>
      <td>{element?.name}</td>
      <td>{element?.gender}</td>
      <td>{element?.birth_year}</td>
      <td>{element?.films?.length}</td>
      <td>{element?.vehicles?.length}</td>
      <td>{element?.starships?.length}</td>
    </tr>
  ));

  return (
    <Box>
      <Table highlightOnHover>
        {rows?.length > 0 ? (
          <>
            <thead>
              <tr>
                <th>Name</th>
                <th>Gender</th>
                <th>Date Of Birth</th>
                <th>Total Films</th>
                <th>Total Vehicles</th>
                <th>Total StarShips</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </>
        ) : (
          <Flex
            align="center"
            justify="center"
            direction="column"
            gap={6}
            h={"60vh"}
          >
            <Text fw="bold" size={32}>
              No data found
            </Text>
            <Text color="dimmed" size={18}>
              Click on any of the above button to see the data.
            </Text>
          </Flex>
        )}
      </Table>

      {rows?.length > 0 && (
        <Center pt={8}>
          <Pagination.Root total={10}>
            <Group spacing={5} position="center">
              <Pagination.First />
              <Pagination.Previous />
              <Pagination.Items />
              <Pagination.Next />
              <Pagination.Last />
            </Group>
          </Pagination.Root>
        </Center>
      )}
    </Box>
  );
};

export default CustomTable;
