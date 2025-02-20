import { Box, Button, Flex, Paper, Text } from "@mantine/core";
import { FC } from "react";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/auth-store";

const AppNavbar: FC = () => {
  const { logout, isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box maw="100vw">
      <Paper bg="gray.3" shadow="xl" radius={0}>
        <Flex align="center" justify="space-between" p={12}>
          <Text
            fw="bold"
            size={28}
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            StarWars
          </Text>
          <Button onClick={handleLogout} rightIcon={<MdLogout size={20} />}>
            {isLoggedIn ? "Logout" : "Login"}
          </Button>
        </Flex>
      </Paper>
    </Box>
  );
};

export default AppNavbar;
