import React from "react";
import {
  Box,
  Flex,
  IconButton,
  Spacer,
  Text,
  Tooltip,
  useColorMode,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { FaMoon, FaSun, FaCaretDown } from "react-icons/fa";

interface HeaderProps {}

const Navbar: React.FC<HeaderProps> = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      p={4}
      boxShadow="md"
      bg={colorMode === "light" ? "white" : "gray.800"}
    >
      <Flex align="center">
        <IconButton
          icon={<FiMenu />}
          aria-label="Menu"
          variant="ghost"
          onClick={() => {}}
        />
        <Text ml={2} fontWeight="bold">
          Your App Name
        </Text>
      </Flex>

      <Spacer />

      <Flex align="center">
        <Tooltip label="Option 1" hasArrow>
          <IconButton
            icon={<FaCaretDown />}
            aria-label="Option 1"
            variant="ghost"
            onClick={() => {}}
          />
        </Tooltip>

        <Tooltip label="Option 2" hasArrow>
          <IconButton
            icon={<FaCaretDown />}
            aria-label="Option 2"
            variant="ghost"
            onClick={() => {}}
          />
        </Tooltip>

        <Tooltip label="Option 3" hasArrow>
          <IconButton
            icon={<FaCaretDown />}
            aria-label="Option 3"
            variant="ghost"
            onClick={() => {}}
          />
        </Tooltip>
      </Flex>

      <IconButton
        icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
        aria-label="Toggle Color Mode"
        variant="ghost"
        onClick={toggleColorMode}
      />
    </Flex>
  );
};

export default Navbar;
