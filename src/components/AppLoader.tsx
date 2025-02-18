import { Center, Loader } from "@mantine/core";
import React, { FC } from "react";

const AppLoader: FC = () => {
  return (
    <Center w="100vw" h="auto">
      <Loader size={"xl"} />
    </Center>
  );
};

export default AppLoader;
