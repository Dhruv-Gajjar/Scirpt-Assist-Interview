import { Card, Center, Flex, Loader, Text } from "@mantine/core";
import { FC } from "react";
import { IVehicle } from "swapi-ts";
import { IFilm } from "swapi-ts/src/SWApi";
import { theme } from "../theme";

interface VehiclesDataCardProps {
  vehicleData: IVehicle[] | undefined;
  isVehicleDataLoading: boolean;
}

const VehiclesDataCard: FC<VehiclesDataCardProps> = ({
  vehicleData,
  isVehicleDataLoading,
}) => {
  return isVehicleDataLoading ? (
    <Center w="60vw" h="40vh">
      <Loader size={"xl"} />
    </Center>
  ) : (
    <Flex
      direction={{ base: "column", sm: "row" }}
      gap={{ base: "md", sm: "lg" }}
      align="center"
      wrap={"wrap"}
    >
      {vehicleData && vehicleData.length > 0 ? (
        vehicleData?.map((vehicle, index) => (
          <Card
            key={index}
            shadow={`${theme.shadows?.lg}`}
            p={12}
            radius="md"
            withBorder
            w={350}
            h={180}
          >
            <Flex align="center" justify="start" gap={12} direction="row">
              <Text size="sm" weight="bold">
                Name:
              </Text>
              <Text
                color="gray.7"
                size="sm"
                transform="capitalize"
                lineClamp={1}
              >
                {vehicle.name}
              </Text>
            </Flex>
            <Flex align="center" justify="start" gap={12} direction="row">
              <Text size="sm" weight="bold">
                Model:
              </Text>
              <Text
                color="gray.7"
                size="sm"
                transform="capitalize"
                lineClamp={1}
              >
                {vehicle?.model}
              </Text>
            </Flex>
            <Flex align="center" justify="start" gap={12} direction="row">
              <Text size="sm" weight="bold">
                Manufacturer:
              </Text>
              <Text
                color="gray.7"
                size="sm"
                transform="capitalize"
                lineClamp={1}
              >
                {vehicle?.manufacturer}
              </Text>
            </Flex>
            <Flex align="center" justify="start" gap={12} direction="row">
              <Text size="sm" weight="bold">
                Cost:
              </Text>
              <Text
                color="gray.7"
                size="sm"
                transform="capitalize"
                lineClamp={1}
              >
                {vehicle?.cost_in_credits}
              </Text>
            </Flex>
            <Flex align="center" justify="start" gap={12} direction="row">
              <Text size="sm" weight="bold">
                Passenger:
              </Text>
              <Text
                color="gray.7"
                size="sm"
                transform="capitalize"
                lineClamp={1}
              >
                {vehicle?.passengers}
              </Text>
            </Flex>
            <Flex align="center" justify="start" gap={12} direction="row">
              <Text size="sm" weight="bold">
                Max Speed:
              </Text>
              <Text
                color="gray.7"
                size="sm"
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
