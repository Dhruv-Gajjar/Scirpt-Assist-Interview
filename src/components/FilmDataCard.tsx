import { Card, Center, Flex, Loader, Text } from "@mantine/core";
import { FC } from "react";
import { IFilm } from "swapi-ts/src/SWApi";
import { theme } from "../theme";

interface FilmDataCardProp {
  filmsData: IFilm[] | undefined;
  isFilmDataLoading: boolean;
}

const FilmDataCard: FC<FilmDataCardProp> = ({
  filmsData,
  isFilmDataLoading,
}) => {
  return isFilmDataLoading ? (
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
      {filmsData && filmsData.length > 0 ? (
        filmsData.map((film, index) => (
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
                Title:
              </Text>
              <Text
                color="gray.7"
                size="sm"
                transform="capitalize"
                lineClamp={1}
              >
                {film?.title}
              </Text>
            </Flex>
            <Flex align="center" justify="start" gap={12} direction="row">
              <Text weight="bold" size="sm">
                Director:
              </Text>
              <Text
                color="gray.7"
                transform="capitalize"
                lineClamp={1}
                size="sm"
              >
                {film?.director}
              </Text>
            </Flex>
            <Flex align="center" justify="start" gap={12} direction="row">
              <Text weight="bold" size="sm">
                Release Date:
              </Text>
              <Text
                color="gray.7"
                transform="capitalize"
                lineClamp={1}
                size="sm"
              >
                {film?.release_date.toString()}
              </Text>
            </Flex>
            <Flex align="center" justify="start" gap={12} direction="row">
              <Text weight="bold" size="sm">
                Producer:
              </Text>
              <Text
                color="gray.7"
                transform="capitalize"
                lineClamp={1}
                size="sm"
              >
                {film?.producer}
              </Text>
            </Flex>
            <Flex align="center" justify="start" gap={12} direction="row">
              <Text weight="bold" size="sm">
                Description:
              </Text>
              <Text
                color="gray.7"
                transform="capitalize"
                lineClamp={1}
                size="sm"
              >
                {film?.opening_crawl}
              </Text>
            </Flex>
            <Flex align="center" justify="start" gap={12} direction="row">
              <Text weight="bold" size="sm">
                Episode ID:
              </Text>
              <Text
                color="gray.7"
                transform="capitalize"
                lineClamp={1}
                size="sm"
              >
                {film?.episode_id}
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

export default FilmDataCard;
