import { Card, Center, Flex, Loader, Text } from "@mantine/core";
import { FC } from "react";
import { IPlanet } from "swapi-ts";
import { theme } from "../theme";

interface PlanetsDataCardProps {
  planetData: IPlanet[] | undefined;
  isPlanetDataLoading: boolean;
}

const PlanetsDataCard: FC<PlanetsDataCardProps> = ({
  planetData,
  isPlanetDataLoading,
}) => {
  return isPlanetDataLoading ? (
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
      {planetData && planetData.length > 0 ? (
        planetData.map((planet, index) => (
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
                {planet?.name}
              </Text>
            </Flex>
            <Flex align="center" justify="start" gap={12} direction="row">
              <Text weight="bold" size="sm">
                Diameter:
              </Text>
              <Text
                color="gray.7"
                transform="capitalize"
                lineClamp={1}
                size="sm"
              >
                {planet?.diameter}
              </Text>
            </Flex>
            <Flex align="center" justify="start" gap={12} direction="row">
              <Text weight="bold" size="sm">
                Oribital Period:
              </Text>
              <Text
                color="gray.7"
                transform="capitalize"
                lineClamp={1}
                size="sm"
              >
                {planet?.orbital_period}
              </Text>
            </Flex>
            <Flex align="center" justify="start" gap={12} direction="row">
              <Text weight="bold" size="sm">
                Climate:
              </Text>
              <Text
                color="gray.7"
                transform="capitalize"
                lineClamp={1}
                size="sm"
              >
                {planet?.climate}
              </Text>
            </Flex>
            <Flex align="center" justify="start" gap={12} direction="row">
              <Text weight="bold" size="sm">
                Gravity:
              </Text>
              <Text
                color="gray.7"
                transform="capitalize"
                lineClamp={1}
                size="sm"
              >
                {planet?.gravity}
              </Text>
            </Flex>
            <Flex align="center" justify="start" gap={12} direction="row">
              <Text weight="bold" size="sm">
                Poppulation:
              </Text>
              <Text
                color="gray.7"
                transform="capitalize"
                lineClamp={1}
                size="sm"
              >
                {planet?.population}
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

export default PlanetsDataCard;
