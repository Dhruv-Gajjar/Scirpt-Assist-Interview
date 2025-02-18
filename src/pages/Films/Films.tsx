import {
  Center,
  Container,
  Pagination,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { usePagination } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IFilm } from "swapi-ts";
import { getFilmsById } from "../../services/api";
import { useAppStore } from "../../store/app.store";

const Films: FC = () => {
  const [selectedFilm, setSelectedFilm] = useState<string>("");
  // const [rows, setRows] = useState<JSX.Element[]>();

  const { films, setFilmsData, setFilmDetailData } = useAppStore();
  const navigate = useNavigate();
  const totalPages = Math.ceil((films.count || 0) / 10);
  const pagination = usePagination({ total: totalPages, initialPage: 1 });

  const { isLoading: selectedFilmLoading } = useQuery({
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
    onError: (error: any) => {
      console.error("Error fetching Star Wars data:", error);
    },
  });

  const rows = (films.results as IFilm[])?.map((film: IFilm, index: number) => (
    <tr
      key={index}
      style={{ cursor: "pointer" }}
      onClick={() => handleSelectedIndex(film.url)}
    >
      <td>{film?.title}</td>
      <td>{film?.director}</td>
      <td>
        <Text w={120}>{film?.producer}</Text>
      </td>
      <td>
        <Text w={200} lineClamp={2}>
          {film?.opening_crawl}
        </Text>
      </td>
      <td>{film?.release_date.toString()}</td>
    </tr>
  ));

  // useEffect(() => {
  //   if (films.results) {
  //     const tableRows = (films.results as IFilm[])?.map(
  //       (film: IFilm, index: number) => (
  //         <tr key={index}>
  //           <td>{film?.title}</td>
  //           <td>{film?.director}</td>
  //           <td>
  //             <Text w={120}>{film?.producer}</Text>
  //           </td>
  //           <td>
  //             <Text w={200} lineClamp={2}>
  //               {film?.opening_crawl}
  //             </Text>
  //           </td>
  //           <td>{film?.release_date.toString()}</td>
  //         </tr>
  //       )
  //     );
  //     setRows(tableRows);
  //   }
  // }, [films.results]);

  const handleSelectedIndex = (url: string) => {
    setSelectedFilm(url.toString());
  };

  return (
    <Container pt={24}>
      <Title>
        <Text weight="bold" size={"lg"}>
          Films
        </Text>
      </Title>
      <Table highlightOnHover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Director</th>
            <th>Producer</th>
            <th>Opening Crawl</th>
            <th>Release Date</th>
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
