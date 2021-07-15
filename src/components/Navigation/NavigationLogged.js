import { NavLink } from "react-router-dom";
import { HStack } from "@chakra-ui/react";

const NavigationLogged = () => {
  return (
    <>
      <HStack spacing={8} alignItems={"center"}>
        <NavLink to="/">Home</NavLink>
        <HStack as={"nav"} spacing={4} display={{ md: "flex" }}>
          <NavLink to="/ERC20">ERC20</NavLink>
          <NavLink to="/Faucet">Faucet</NavLink>
          <NavLink to="/ERC721">ERC721</NavLink>
        </HStack>
      </HStack>
    </>
  );
};

export default NavigationLogged;
