import { Box, Button, Flex, Paper, Text } from "@mantine/core";
import { FC, ReactNode } from "react";
import { MdLogout } from "react-icons/md";
import useAuthStore from "../store/auth-store";

interface AppNavbarProps {
  children: ReactNode;
}

const AppNavbar: FC<AppNavbarProps> = ({ children }) => {
  const { logout } = useAuthStore();

  return (
    <Box maw="100vw">
      <Paper bg="gray.3" shadow="xl" radius={0}>
        <Flex align="center" justify="space-between" p={12}>
          <Text fw="bold" size={28}>
            StarWars
          </Text>
          <Button onClick={logout} rightIcon={<MdLogout size={20} />}>
            Logout
          </Button>
        </Flex>
      </Paper>
      {children}
    </Box>
  );
};

export default AppNavbar;
