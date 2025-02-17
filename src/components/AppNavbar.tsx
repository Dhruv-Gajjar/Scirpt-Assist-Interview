import { Box, Button, Flex, Paper, Text } from "@mantine/core";
import { FC, ReactNode } from "react";
import { MdLogout } from "react-icons/md";

interface AppNavbarProps {
  children: ReactNode;
}

const AppNavbar: FC<AppNavbarProps> = ({ children }) => {
  return (
    <Box maw="100vw">
      <Paper bg="gray.3" shadow="xl" radius={0}>
        <Flex align="center" justify="space-between" p={12}>
          <Text fw="bold" size={28}>
            StarWars
          </Text>
          <Button rightIcon={<MdLogout size={20} />}>Logout</Button>
        </Flex>
      </Paper>
      {children}
    </Box>
  );
};

export default AppNavbar;
