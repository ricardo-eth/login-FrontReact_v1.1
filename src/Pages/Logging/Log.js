import React, { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Heading,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  CircularProgress,
} from "@chakra-ui/react";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import { useForm } from "react-hook-form";
import axios from "axios";

const Log = ({ setIsLogged }) => {
  const { register, handleSubmit } = useForm();
  const toast = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordVisibility = () => setShowPassword(!showPassword);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitButton = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:7000/Log",
        data: {
          username: data.username,
          password: data.password,
        },
      });
      setShowPassword(false);
      setIsLoading(false);
      if (response.data.logged) {
        setIsLogged(true);
      } else {
        throw new Error(response.data);
      }
    } catch (e) {
      setShowPassword(false);
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
          <Heading>Login</Heading>
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
              type={showPassword ? "text" : "password"}
              placeholder="*******"
              size="lg"
              {...register("password")}
            />
            <InputRightElement>
              <Button m={20} onClick={handlePasswordVisibility}>
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
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
            "Sign In"
          )}
        </Button>
      </Flex>
    </form>
  );
};

export default Log;
