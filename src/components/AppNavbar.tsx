import { Button, Flex, Paper, Text } from "@mantine/core";
import { FC, ReactNode } from "react";
import { MdLogout } from "react-icons/md";
import { theme } from "../theme";

interface AppNavbarProps {
  children: ReactNode;
}

const AppNavbar: FC<AppNavbarProps> = ({ children }) => {
  return (
    <>
      <Paper shadow="md" radius={0}>
        <Flex align="center" justify="space-between" p={12}>
          <Text>Star Wars</Text>
          <Button rightIcon={<MdLogout size={20} />}>Logout</Button>
        </Flex>
      </Paper>
      {children}
    </>
  );
};

export default AppNavbar;
