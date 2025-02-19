import { Card, Center, Flex, Text } from "@mantine/core";
import { FC } from "react";
import { IFilm } from "swapi-ts/src/SWApi";
import { theme } from "../theme";

interface FilmDataCardProp {
  filmsData: IFilm[] | undefined;
}

const FilmDataCard: FC<FilmDataCardProp> = ({ filmsData }) => {
  return (
    <Flex wrap="wrap" align="center" gap={8}>
      {filmsData && filmsData.length > 0 ? (
        filmsData?.map((film, index) => (
          <Card
            key={index}
            shadow={`${theme.shadows?.lg}`}
            p={12}
            radius="md"
            withBorder
            w={350}
            h={200}
          >
            <Flex align="center" justify="start" gap={12} direction="row">
              <Text weight="bold">Title:</Text>
              <Text
                color="gray.7"
                size="md"
                transform="capitalize"
                lineClamp={1}
              >
                {film?.title}
              </Text>
            </Flex>
            <Flex align="center" justify="start" gap={12} direction="row">
              <Text weight="bold">Director:</Text>
              <Text
                color="gray.7"
                size="md"
                transform="capitalize"
                lineClamp={1}
              >
                {film?.director}
              </Text>
            </Flex>
            <Flex align="center" justify="start" gap={12} direction="row">
              <Text weight="bold">Release Date:</Text>
              <Text
                color="gray.7"
                size="md"
                transform="capitalize"
                lineClamp={1}
              >
                {film?.release_date.toString()}
              </Text>
            </Flex>
            <Flex align="center" justify="start" gap={12} direction="row">
              <Text weight="bold">Producer:</Text>
              <Text
                color="gray.7"
                size="md"
                transform="capitalize"
                lineClamp={1}
              >
                {film?.producer}
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
