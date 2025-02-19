import { Card, Center, Flex, Text } from "@mantine/core";
import { FC } from "react";
import { IVehicle } from "swapi-ts";
import { IFilm } from "swapi-ts/src/SWApi";
import { theme } from "../theme";

interface VehiclesDataCardProps {
  vehicleData: IVehicle[] | undefined;
}

const VehiclesDataCard: FC<VehiclesDataCardProps> = ({ vehicleData }) => {
  return (
    <Flex wrap="wrap" align="center" gap={8}>
      {vehicleData && vehicleData.length > 0 ? (
        vehicleData?.map((vehicle, index) => (
          <Card
            key={index}
            shadow={`${theme.shadows?.lg}`}
            p={12}
            radius="md"
            withBorder
            w={350}
            h={300}
          >
            <Flex align="center" justify="start" gap={12} direction="row">
              <Text weight="bold">Name:</Text>
              <Text
                color="gray.7"
                size="md"
                transform="capitalize"
                lineClamp={1}
              >
                {vehicle.name}
              </Text>
            </Flex>
            <Flex align="center" justify="start" gap={12} direction="row">
              <Text weight="bold">Model:</Text>
              <Text
                color="gray.7"
                size="md"
                transform="capitalize"
                lineClamp={1}
              >
                {vehicle?.model}
              </Text>
            </Flex>
            <Flex align="center" justify="start" gap={12} direction="row">
              <Text weight="bold">Manufacturer:</Text>
              <Text
                color="gray.7"
                size="md"
                transform="capitalize"
                lineClamp={1}
              >
                {vehicle?.manufacturer}
              </Text>
            </Flex>
            <Flex align="center" justify="start" gap={12} direction="row">
              <Text weight="bold">Cost:</Text>
              <Text
                color="gray.7"
                size="md"
                transform="capitalize"
                lineClamp={1}
              >
                {vehicle?.cost_in_credits}
              </Text>
            </Flex>
            <Flex align="center" justify="start" gap={12} direction="row">
              <Text weight="bold">Passenger:</Text>
              <Text
                color="gray.7"
                size="md"
                transform="capitalize"
                lineClamp={1}
              >
                {vehicle?.passengers}
              </Text>
            </Flex>
            <Flex align="center" justify="start" gap={12} direction="row">
              <Text weight="bold">Max Speed:</Text>
              <Text
                color="gray.7"
                size="md"
                transform="capitalize"
                lineClamp={1}
              >
                {vehicle?.max_atmosphering_speed}
              </Text>
            </Flex>
          </Card>
        ))
      ) : (
        <Center p={12}>
          <Text>No Data Found.</Text>
        </Center>
      )}
    </Flex>
  );
};

export default VehiclesDataCard;
