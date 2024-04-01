import {
  Box,
  Card,
  CardBody,
  Icon,
  Text,
  Image,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { timeAgo } from "../utils/DateUtils";
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
  const like = async (el: ValidationDTO) => {
    try {
      await LikeUnlike(el.id);
      setIsLiked(!isLiked);
      setLikeCounter(isLiked ? likeCounter - 1 : likeCounter + 1);
    } catch (e) {
      setIsLiked(isLiked);
      setLikeCounter(isLiked ? likeCounter + 1 : likeCounter - 1);
    }
  };
  return (
    <Card w="50%" m="3vh" key={el.id}>
      <CardHeader>
        <Heading size="md">
          <Flex>
            <Image
              onClick={() => {
                navigate(`/user/${el.Habit.user.id}`);
              }}
              borderRadius="full"
              boxSize="40px"
              mr="10px"
              src={el.Habit.user.imageUrl}
              alt={el.Habit.user.username}
            />
            <Box>
              {el.Habit.user.username} validated {el.Habit.name}
              <Text fontSize="xs" color="darkgray" fontWeight="normal">
                {timeAgo(new Date(el.validatedAt))}
              </Text>
            </Box>
          </Flex>
        </Heading>
      </CardHeader>
      <CardBody>
        <Text>{el.message}</Text>
      </CardBody>
      <CardFooter>
        <Icon
          as={isLiked ? FaHeart : FaRegHeart}
          color={isLiked ? "red" : "black"}
          fontSize="lg"
          onClick={() => {
            like(el);
          }}
        />
        <Text fontSize="sm" ml="2px">
          {likeCounter}
        </Text>
      </CardFooter>
    </Card>
  );
}
