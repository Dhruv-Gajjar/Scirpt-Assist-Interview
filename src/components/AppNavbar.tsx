import { Box, Button, Flex, Paper, Text } from "@mantine/core";
import { FC, ReactNode } from "react";
import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import useAuthStore from "../store/auth-store";

interface AppNavbarProps {
  children: ReactNode;
}

const AppNavbar: FC = () => {
  const { logout } = useAuthStore();

  return (
    <Box maw="100vw">
      <Paper bg="gray.3" shadow="xl" radius={0}>
        <Flex align="center" justify="space-between" p={12}>
          <Link to={"/"}>
            <Text fw="bold" size={28}>
              StarWars
            </Text>
          </Link>
          <Button onClick={logout} rightIcon={<MdLogout size={20} />}>
            Logout
          </Button>
        </Flex>
      </Paper>
    </Box>
  );
};

export default AppNavbar;
