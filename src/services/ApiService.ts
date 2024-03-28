import {
  CreateUserResponseDTO,
  UserLoginDTO,
  LoginResponse,
  CreateUserDTO,
  UserDTO,
  ValidationDTO,
  AccountDTO,
} from "./ApiModels";
import axios from "axios";

const LoginApi = async (loginInfo: UserLoginDTO): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(
    "http://localhost:3000/auth/login",
    loginInfo
  );

  return response.data;
};

const SignUpApi = async (
  user: CreateUserDTO
): Promise<CreateUserResponseDTO> => {
  const response = await axios.post<CreateUserResponseDTO>(
    "http://localhost:3000/auth/signup",
    user
  );

  return response.data;
};

const GetMe = async (): Promise<AccountDTO> => {
  const response = await axios.get("http://localhost:3000/accounts/me", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  return response.data.data;
};

const GetFollowers = async (): Promise<UserDTO[]> => {
  const response = await axios.get("http://localhost:3000/follows/followers/", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  return response.data.data;
};

const GetFollowings = async (): Promise<UserDTO[]> => {
  const response = await axios.get(
    "http://localhost:3000/follows/followings/",
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );

  return response.data.data;
};

const GetFeed = async (): Promise<ValidationDTO[]> => {
  const response = await axios.get("http://localhost:3000/feed", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  return response.data.data;
};

const LikeUnlike = async (validationId: number) => {
  const response = await axios.post(
    `http://localhost:3000/validation/${validationId}/likes`,
    {},
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );
  return response.data.data;
};

const GetRequests = async () => {
  const response = await axios.get("http://localhost:3000/follows/requests/", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  return response.data.data;
};

const AcceptFollowRequest = async (userId: number) => {
  const response = await axios.put(
    `http://localhost:3000/follows/accept/${userId}`,
    {},
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );
  return response.data.data;
};

const DeleteFollowing = async (userId: number) => {
  await axios.delete(`http://localhost:3000/follows/following/${userId}`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
};

const DeleteFollower = async (userId: number) => {
  await axios.delete(`http://localhost:3000/follows/follower/${userId}`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
};

export {
  LoginApi,
  SignUpApi,
  GetMe,
  GetFeed,
  LikeUnlike,
  GetFollowers,
  GetFollowings,
  AcceptFollowRequest,
  GetRequests,
  DeleteFollower,
  DeleteFollowing,
};
