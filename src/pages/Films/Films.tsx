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
import { IFilm } from "swapi-ts";
import { getFilmsById, getStarWarsData } from "../../services/api";
import { useAppStore } from "../../store/app.store";

const Films: FC = () => {
  const [selectedFilm, setSelectedFilm] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const { films, setFilmsData, setFilmDetailData } = useAppStore();
  const navigate = useNavigate();
  const totalPages = Math.ceil((films.count || 0) / 10);
  const pagination = usePagination({ total: totalPages, initialPage: 1 });

  const { data: filmsData, isFetching: filmsLoading } = useQuery({
    queryKey: ["films", pagination.active],
    queryFn: async () => {
      const baseUrl = "https://swapi.dev/api/films/";
      const url =
        pagination.active === 1
          ? baseUrl
          : `${baseUrl}?page=${pagination.active}`;
      const response = await getStarWarsData(url);
      setFilmsData(response);
      return response;
    },
    keepPreviousData: true,
    staleTime: 0.5,
    cacheTime: 5 * 60 * 1000,
    enabled: !!pagination.active,
  });

  const { isFetching: selectedFilmLoading } = useQuery({
    queryKey: ["film", selectedFilm],
    queryFn: async () => {
      const data: IFilm = await getFilmsById(selectedFilm);
      if (data) {
        const route = selectedFilm.split("/").slice(-2)[0];
        setFilmDetailData(data);
        navigate(`/films/${route}`);
      }
      return data;
    },
    enabled: !!selectedFilm,
    staleTime: 0.5,
    cacheTime: 5 * 60 * 1000,
    onError: (error: any) => {
      console.error("Error fetching Star Wars data:", error);
    },
  });

  const handleSelectedIndex = (url: string) => {
    setSelectedFilm(url.toString());
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value);
  };

  const filteredPlanets = useMemo(() => {
    if (!search) return (films.results as IFilm[]) || [];
    return (films.results as IFilm[]).filter((film) =>
      film.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, films.results]);

  const rows = (filteredPlanets as IFilm[])?.map(
    (film: IFilm, index: number) => (
      <tr
        key={index}
        style={{ cursor: "pointer" }}
        onClick={() => handleSelectedIndex(film.url)}
      >
        <td>
          <Text lineClamp={1}>{film?.title}</Text>
        </td>
        <td>
          <Text lineClamp={1}>{film?.director}</Text>
        </td>
        <td width={180}>
          <Text lineClamp={1}>{film?.producer}</Text>
        </td>
        <td width={180}>
          <Text lineClamp={2}>{film?.opening_crawl}</Text>
        </td>
        <td>
          <Text lineClamp={1}>{film?.release_date.toString()}</Text>
        </td>
      </tr>
    )
  );

  return filmsLoading || selectedFilmLoading ? (
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
            Films
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
            <th>
              <Text lineClamp={1}>Title</Text>
            </th>
            <th>
              <Text lineClamp={1}>Director</Text>
            </th>
            <th>
              <Text lineClamp={1}>Producer</Text>
            </th>
            <th>
              <Text lineClamp={1}>Opening Crawl</Text>
            </th>
            <th>
              <Text lineClamp={1}>Release Date</Text>
            </th>
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

export default Films;
