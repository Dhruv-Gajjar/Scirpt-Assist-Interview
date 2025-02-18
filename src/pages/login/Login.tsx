import { Center, Flex, Text, Title } from "@mantine/core";
import { FC } from "react";
import AuthForm from "../../components/AuthForm";

const Login: FC = () => {
  return (
    <Center maw={"100vw"} h={"80vh"}>
      <Flex direction={"column"} gap={8}>
        <Title order={2} fw={"bold"}>
          <Text align="center">Login</Text>
        </Title>
        <AuthForm />
      </Flex>
    </Center>
  );
};

export default Login;
