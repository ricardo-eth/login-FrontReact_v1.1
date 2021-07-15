import { Flex, Heading } from "@chakra-ui/react";
import { HeaderComp as Header, MetaMaskInstalled } from "../components";

function HomePage() {
  return (
    <>
      <Header />
      <Flex flexDirection="column" p={10}>
        <Heading
          textAlign="center"
          as="h1"
          size="4xl"
          isTruncated
          p={3}
          marginBottom="10"
        >
          Welcome NFTools
        </Heading>
        <MetaMaskInstalled />
      </Flex>
    </>
  );
}

export default HomePage;
