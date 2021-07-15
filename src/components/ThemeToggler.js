import { Box, Button, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export default function ThemeToggler() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box textAlign="right" py={4} mr={12}>
      {colorMode === "light" ? (
        <Button onClick={toggleColorMode}>
          <MoonIcon />
        </Button>
      ) : (
        <Button onClick={toggleColorMode}>
          <SunIcon />
        </Button>
      )}
    </Box>
  );
}
