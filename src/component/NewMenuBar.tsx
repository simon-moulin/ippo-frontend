import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Badge,
} from "@chakra-ui/react";

import { IconType } from "react-icons";
import { ReactNode } from "react";
import { FiMenu } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { RequestsModal } from "./RequestsModal";
import { SearchModal } from "./SearchModal";
import { FaHome, FaSearch, FaSignOutAlt } from "react-icons/fa";
import { FaAddressBook, FaRepeat, FaUser } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { GetRequests } from "../services/ApiService";

export function NewMenuBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const requestsDisclosure = useDisclosure();
  const searchDisclosure = useDisclosure();

  const { data } = useQuery({
    queryKey: ["requests"],
    queryFn: GetRequests,
  });

  return (
    <>
      <Box>
        <SidebarContent
          onClose={() => onClose}
          requestsDisclosure={requestsDisclosure}
          searchDisclosure={searchDisclosure}
          requestsNumber={data?.length}
          display={{ base: "none", md: "block" }}
        />
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="full"
        >
          <DrawerContent>
            <SidebarContent
              requestsNumber={data?.length}
              onClose={onClose}
              requestsDisclosure={requestsDisclosure}
              searchDisclosure={searchDisclosure}
            />
          </DrawerContent>
        </Drawer>
        {/* mobilenav */}
        <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
        <Box ml={{ base: 0, md: 60 }} p="4">
          {/* Content */}
        </Box>
      </Box>
      <RequestsModal
        isOpen={requestsDisclosure.isOpen}
        onClose={requestsDisclosure.onClose}
      ></RequestsModal>
      <SearchModal
        isOpen={searchDisclosure.isOpen}
        onClose={searchDisclosure.onClose}
      ></SearchModal>
    </>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
  requestsDisclosure: {
    isOpen: boolean;
    onOpen: () => void;
  };
  searchDisclosure: {
    isOpen: boolean;
    onOpen: () => void;
  };
  requestsNumber: number;
}

const SidebarContent = ({
  onClose,
  requestsDisclosure,
  searchDisclosure,
  requestsNumber,
  ...rest
}: SidebarProps) => {
  const navigation = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigation("/");
  };
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Ippo
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <NavItem
        icon={FaHome}
        onClick={() => {
          navigation("/feed");
        }}
      >
        Feed
      </NavItem>
      <NavItem
        icon={FaRepeat}
        onClick={() => {
          navigation("/habits");
        }}
      >
        Habits
      </NavItem>
      <NavItem
        icon={FaSearch}
        onClick={() => {
          searchDisclosure.onOpen();
        }}
      >
        Search
      </NavItem>
      <NavItem
        icon={FaAddressBook}
        onClick={() => {
          requestsDisclosure.onOpen();
        }}
      >
        Request
        {requestsNumber > 0 ? (
          <Badge ml={2} backgroundColor="#ff5F5F" color="white" size="sm">
            {requestsNumber}
          </Badge>
        ) : (
          <></>
        )}
      </NavItem>
      <NavItem
        icon={FaUser}
        onClick={() => {
          navigation("/me");
        }}
      >
        Profile
      </NavItem>
      <NavItem mt="auto" color="red.400" icon={FaSignOutAlt} onClick={logout}>
        Logout
      </NavItem>
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactNode;
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Box style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "gray.100",
        }}
        {...rest}
      >
        {icon && <Icon mr="4" fontSize="16" as={icon} />}
        {children}
      </Flex>
    </Box>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Ippo
      </Text>
    </Flex>
  );
};
