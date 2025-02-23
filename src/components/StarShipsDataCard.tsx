import { Card, Center, Flex, Loader, Text } from "@mantine/core";
import { FC } from "react";
import { IStarship, IVehicle } from "swapi-ts";
import { IFilm } from "swapi-ts/src/SWApi";
import { theme } from "../theme";

interface StarShipsDataCardProps {
  starShipData: IStarship[] | undefined;
  isStarShipDataLoading: boolean;
}

const StarShipsDataCard: FC<StarShipsDataCardProps> = ({
  starShipData,
  isStarShipDataLoading,
}) => {
  return isStarShipDataLoading ? (
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
      {starShipData && starShipData.length > 0 ? (
        starShipData?.map((starship, index) => (
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
              <Text weight="bold" size="sm">
                Name:
              </Text>
              <Text
                color="gray.7"
                size="sm"
                transform="capitalize"
                lineClamp={1}
              >
                {starship.name}
              </Text>
            </Flex>
            <Flex align="center" justify="start" gap={12} direction="row">
              <Text weight="bold" size="sm">
                Model:
              </Text>
              <Text
                color="gray.7"
                size="sm"
                transform="capitalize"
                lineClamp={1}
              >
                {starship?.model}
              </Text>
            </Flex>
            <Flex align="center" justify="start" gap={12} direction="row">
              <Text weight="bold" size="sm">
                Manufacturer:
              </Text>
              <Text
                color="gray.7"
                size="sm"
                transform="capitalize"
                lineClamp={1}
              >
                {starship?.manufacturer}
              </Text>
            </Flex>
            <Flex align="center" justify="start" gap={12} direction="row">
              <Text weight="bold" size="sm">
                Cost:
              </Text>
              <Text
                color="gray.7"
                size="sm"
                transform="capitalize"
                lineClamp={1}
              >
                {starship?.cost_in_credits}
              </Text>
            </Flex>
            <Flex align="center" justify="start" gap={12} direction="row">
              <Text weight="bold" size="sm">
                Passenger:
              </Text>
              <Text
                color="gray.7"
                size="sm"
                transform="capitalize"
                lineClamp={1}
              >
                {starship?.passengers}
              </Text>
            </Flex>
            <Flex align="center" justify="start" gap={12} direction="row">
              <Text weight="bold" size="sm">
                Max Speed:
              </Text>
              <Text
                color="gray.7"
                size="sm"
                transform="capitalize"
                lineClamp={1}
              >
                {starship?.max_atmosphering_speed}
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

export default StarShipsDataCard;
