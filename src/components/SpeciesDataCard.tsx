import { Card, Center, Flex, Loader, Text } from "@mantine/core";
import { FC } from "react";
import { ISpecie } from "swapi-ts";
import { theme } from "../theme";

interface SpeciesDataCardProps {
  speciesData: ISpecie[] | undefined;
  isSpeciesDataLoading: boolean;
}

const SpeciesDataCard: FC<SpeciesDataCardProps> = ({
  speciesData,
  isSpeciesDataLoading,
}) => {
  return isSpeciesDataLoading ? (
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
      {speciesData && speciesData.length > 0 ? (
        speciesData.map((specie, index) => (
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
                {specie?.name}
              </Text>
            </Flex>
            <Flex align="center" justify="start" gap={12} direction="row">
              <Text weight="bold" size="sm">
                Classification:
              </Text>
              <Text
                color="gray.7"
                transform="capitalize"
                lineClamp={1}
                size="sm"
              >
                {specie?.classification}
              </Text>
            </Flex>
            <Flex align="center" justify="start" gap={12} direction="row">
              <Text weight="bold" size="sm">
                Average Life Span:
              </Text>
              <Text
                color="gray.7"
                transform="capitalize"
                lineClamp={1}
                size="sm"
              >
                {specie?.average_lifespan}
              </Text>
            </Flex>
            <Flex align="center" justify="start" gap={12} direction="row">
              <Text weight="bold" size="sm">
                Average Height:
              </Text>
              <Text
                color="gray.7"
                transform="capitalize"
                lineClamp={1}
                size="sm"
              >
                {specie?.average_height}
              </Text>
            </Flex>
            <Flex align="center" justify="start" gap={12} direction="row">
              <Text weight="bold" size="sm">
                Designation:
              </Text>
              <Text
                color="gray.7"
                transform="capitalize"
                lineClamp={1}
                size="sm"
              >
                {specie?.designation}
              </Text>
            </Flex>
            <Flex align="center" justify="start" gap={12} direction="row">
              <Text weight="bold" size="sm">
                Language:
              </Text>
              <Text
                color="gray.7"
                transform="capitalize"
                lineClamp={1}
                size="sm"
              >
                {specie?.language}
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

export default SpeciesDataCard;
