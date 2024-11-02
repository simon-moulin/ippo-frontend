import {
  Box,
  Card,
  CardBody,
  Icon,
  Text,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Avatar,
} from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import { UserDTO, ValidationDTO } from "../services/ApiModels";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useState } from "react";
import { LikeUnlike } from "../services/ApiService";
import { useNavigate } from "react-router-dom";

type ValidationCardProps = {
  el: ValidationDTO;
};

export function ValidationCard({ el }: ValidationCardProps) {
  const loggedUser: UserDTO = JSON.parse(localStorage.getItem("user")!);
  const navigate = useNavigate();

  const [isLiked, setIsLiked] = useState(
    el.likedBy.map((el) => el.userId).includes(loggedUser.id)
  );
  const [likeCounter, setLikeCounter] = useState(el._count.likedBy);

  const handleLikeToggle = async () => {
    await LikeUnlike(el.id);
    setIsLiked(!isLiked);
    setLikeCounter((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
  };

  return (
    <Card
      p={4}
      shadow="md"
      borderWidth="0"
      w={{ base: "90%", md: "70%", lg: "50%" }}
      m="3vh"
      key={el.id}
      onDoubleClick={handleLikeToggle}
    >
      <CardHeader>
        <Heading size={{ base: "sm", md: "md" }}>
          {" "}
          <Flex direction={{ base: "column", md: "row" }}>
            {" "}
            <Avatar
              cursor="pointer"
              onClick={() => navigate(`/profil/${el.Habit.user.id}`)}
              borderRadius="full"
              boxSize={{ base: "30px", md: "40px" }}
              mr={{ md: "10px" }}
              src={el.Habit.user.imageUrl}
              name={el.Habit.user.username}
            />
            <Box fontSize={{ base: "sm", md: "md" }}>
              {el.Habit.user.username} validated {el.Habit.name}
              <Text
                fontSize={{ base: "xs", md: "sm" }}
                color="darkgray"
                fontWeight="normal"
              >
                {formatDistanceToNow(new Date(el.validatedAt), {
                  addSuffix: true,
                })}
              </Text>
            </Box>
          </Flex>
        </Heading>
      </CardHeader>

      <CardBody>
        <Text fontSize={{ base: "sm", md: "md" }}>{el.message}</Text>{" "}
        {/* Texte responsive */}
      </CardBody>

      <CardFooter>
        <Icon
          as={isLiked ? FaHeart : FaRegHeart}
          color={isLiked ? "red.400" : "gray.600"}
          fontSize={{ base: "md", md: "lg" }}
          cursor="pointer"
          onClick={handleLikeToggle}
          _hover={{ transform: "scale(1.2)" }}
          transition="transform 0.1s ease-in-out"
        />
        <Text fontSize={{ base: "sm", md: "md" }} ml="2">
          {likeCounter}
        </Text>
      </CardFooter>
    </Card>
  );
}
