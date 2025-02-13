import { Button, Flex, Input, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { FC } from "react";
import { MdOutlineArrowRightAlt } from "react-icons/md";

const AuthForm: FC = () => {
  const authForm = useForm({
    initialValues: {
      username: "",
      password: "",
    },
    validate: {
      username: (value) =>
        /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.test(value)
          ? null
          : "Invalid Username",
      password: (value) =>
        value.length < 6 ? "Password must be atlest 6 characters" : null,
    },
  });

  // const handleFormSubmit = (values: typeof authForm.values) => {
  //   console.log(values);
  // };

  return (
    <form onSubmit={authForm.onSubmit((value) => console.log(value))}>
      <Flex w={350} direction={"column"} gap={"lg"}>
        <TextInput
          withAsterisk
          label="Username"
          placeholder="John doe"
          {...authForm.getInputProps("username")}
        />
        <TextInput
          withAsterisk
          label="Password"
          placeholder="******"
          type="password"
          {...authForm.getInputProps("password")}
        />
        <Button
          type="submit"
          fullWidth
          rightIcon={<MdOutlineArrowRightAlt size={20} />}
        >
          Login
        </Button>
      </Flex>
    </form>
  );
};

export default AuthForm;
