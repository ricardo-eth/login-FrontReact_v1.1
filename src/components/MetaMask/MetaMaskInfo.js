import { useContext } from "react";
import { Web3Context } from "web3-hooks";

import {
  HStack,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Flex,
  Link,
  Stack,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

const MetaMaskInfo = () => {
  const [web3State] = useContext(Web3Context);
  const { isOpen, onOpen, onClose } = useDisclosure();

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Your wallet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={3}>
              <Box>{web3State.account}</Box>
              <Link
                href={`https://${
                  web3State.chainId !== 1 ? web3State.networkName + "." : ""
                }etherscan.io/address/${web3State.account}`}
                isExternal
              >
                View on Etherscan <ExternalLinkIcon mx="2px" />
              </Link>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Flex justifyContent="space-between" alignItems="center" mt={4}>
              <Button onClick={refreshPage}>Log out</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <HStack spacing="24px">
        <Button onClick={onOpen}>
          {web3State.account?.replace(
            web3State.account?.substring(6, 38),
            "..."
          )}
        </Button>

        <Box display={{ base: "none", md: "flex" }}>
          {web3State.balance} ETH
        </Box>
        <Box display={{ base: "none", md: "flex" }}>
          {web3State.networkName}
        </Box>
      </HStack>
    </>
  );
};

export default MetaMaskInfo;
