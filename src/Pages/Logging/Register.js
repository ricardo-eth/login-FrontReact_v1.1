import React, { useState } from "react";
import {
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Button,
  Input,
  Box,
  InputGroup,
  InputRightElement,
  CircularProgress,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import axios from "axios";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const Register = ({ setTabIndex }) => {
  const { register, handleSubmit } = useForm();
  const toast = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handlePasswordVisibility = () => setShowPassword(!showPassword);
  const handleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitButton = async (data) => {
    setIsLoading(true);
    try {
      if (data.password !== data.password2) {
        throw new Error("the passwords are not the same please retry");
      }

      const response = await axios({
        method: "post",
        url: "http://localhost:7000/register",
        data: {
          username: data.username,
          password: data.password,
        },
      });
      setShowPassword(false);
      setShowConfirmPassword(false);
      setIsLoading(false);
      toast({
        title: "Registered",
        description: `${response.data}`,
        status: "success",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
      setTabIndex(0);
    } catch (e) {
      setShowPassword(false);
      setShowConfirmPassword(false);
      setIsLoading(false);
      toast({
        title: "Error",
        description: `${e.message}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitButton)} m={2}>
      <Flex direction="column">
        <Box textAlign="center" mb="25">
          <Heading>Register</Heading>
        </Box>

        <FormControl id="name" isRequired>
          <FormLabel>UserName</FormLabel>
          <Input
            placeholder="name"
            mb={3}
            isRequired
            {...register("username")}
          />
        </FormControl>
        <FormControl isRequired mt={6}>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              placeholder="******"
              type={showPassword ? "text" : "password"}
              mb={6}
              isRequired
              {...register("password")}
            />
            <InputRightElement>
              <Button m={20} onClick={handlePasswordVisibility}>
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl isRequired mt={6}>
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup>
            <Input
              placeholder="******"
              type={showConfirmPassword ? "text" : "password"}
              mb={6}
              isRequired
              {...register("password2")}
            />
            <InputRightElement>
              <Button m={20} onClick={handleConfirmPasswordVisibility}>
                {showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button
          variantColor="teal"
          variant="outline"
          type="submit"
          width="full"
          mt={4}
        >
          {isLoading ? (
            <CircularProgress isIndeterminate size="24px" color="teal" />
          ) : (
            "Register"
          )}
        </Button>
      </Flex>
    </form>
  );
};

export default Register;
