import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Web3Context } from "web3-hooks";
import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  AvatarBadge,
} from "@chakra-ui/react";
import { ThemeToggler } from "./";

import MetaMaskInfo from "./MetaMask/MetaMaskInfo";
import Navigation from "./Navigation/Navigation";

export default function Header() {
  const [web3State, login] = useContext(Web3Context);

  function refreshPage() {
    window.location.reload(false);
  }

  /*
  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      toggleColorMode();
    }
  }, []);
  */

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Navigation />
          <Flex alignItems={"center"}>
            {web3State.isLogged && (
              <Box mr={5}>
                <MetaMaskInfo />
              </Box>
            )}
            <Box mr={5} display={{ base: "none", md: "flex" }}>
              <ThemeToggler />
            </Box>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
              >
                <Avatar size="sm">
                  {!web3State.isLogged ? (
                    <AvatarBadge
                      bg="tomato"
                      borderColor="papayawhip"
                      boxSize="1.25em"
                    />
                  ) : (
                    <AvatarBadge
                      bg="green.500"
                      borderColor="papayawhip"
                      boxSize="1.25em"
                    />
                  )}
                </Avatar>
              </MenuButton>
              <MenuList>
                {!web3State.isLogged ? (
                  <>
                    <MenuItem onClick={login}>Unlock Wallet</MenuItem>
                  </>
                ) : (
                  <>
                    <NavLink to="/">
                      <MenuItem>Home</MenuItem>
                    </NavLink>
                    <MenuDivider />
                    <MenuItem onClick={refreshPage}>Disconnect</MenuItem>
                  </>
                )}
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
