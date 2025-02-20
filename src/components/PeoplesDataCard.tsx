import { Card, Center, Flex, Loader, Text } from "@mantine/core";
import { FC } from "react";
import { IPeople } from "swapi-ts";
import { theme } from "../theme";

interface PeoplesDataCardProps {
  peoplesData: IPeople[] | undefined;
  ispeoplesDataLoading: boolean;
}

const PeoplesDataCard: FC<PeoplesDataCardProps> = ({
  peoplesData,
  ispeoplesDataLoading,
}) => {
  return ispeoplesDataLoading ? (
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
      {peoplesData && peoplesData.length > 0 ? (
        peoplesData?.map((people, index) => (
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
                {people.name}
              </Text>
            </Flex>
            <Flex align="center" justify="start" gap={12} direction="row">
              <Text weight="bold" size="sm">
                Height:
              </Text>
              <Text
                color="gray.7"
                size="sm"
                transform="capitalize"
                lineClamp={1}
              >
                {people?.height}
              </Text>
            </Flex>
            <Flex align="center" justify="start" gap={12} direction="row">
              <Text weight="bold" size="sm">
                Mass:
              </Text>
              <Text
                color="gray.7"
                size="sm"
                transform="capitalize"
                lineClamp={1}
              >
                {people?.mass}
              </Text>
            </Flex>
            <Flex align="center" justify="start" gap={12} direction="row">
              <Text weight="bold" size="sm">
                Gender:
              </Text>
              <Text
                color="gray.7"
                size="sm"
                transform="capitalize"
                lineClamp={1}
              >
                {people?.gender}
              </Text>
            </Flex>
            <Flex align="center" justify="start" gap={12} direction="row">
              <Text weight="bold" size="sm">
                Hair Color:
              </Text>
              <Text
                color="gray.7"
                size="sm"
                transform="capitalize"
                lineClamp={1}
              >
                {people?.hair_color}
              </Text>
            </Flex>
            <Flex align="center" justify="start" gap={12} direction="row">
              <Text weight="bold" size="sm">
                Skin Color:
              </Text>
              <Text
                color="gray.7"
                size="sm"
                transform="capitalize"
                lineClamp={1}
              >
                {people?.skin_color}
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

export default PeoplesDataCard;
