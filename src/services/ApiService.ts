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

const API_URL = process.env.API_URL;

const LoginApi = async (loginInfo: UserLoginDTO): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(
    API_URL + "/auth/login",
    loginInfo
  );

  return response.data;
};

const SignUpApi = async (
  user: CreateUserDTO
): Promise<CreateUserResponseDTO> => {
  const response = await axios.post<CreateUserResponseDTO>(
    API_URL + "/auth/signup",
    user
  );

  return response.data;
};

const GetMe = async (): Promise<AccountDTO> => {
  const response = await axios.get(API_URL + "/accounts/me", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  return response.data.data;
};

const GetFollowers = async (): Promise<UserDTO[]> => {
  const response = await axios.get(API_URL + "/follows/followers/", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  return response.data.data;
};

const GetFollowings = async (): Promise<UserDTO[]> => {
  const response = await axios.get(API_URL + "/follows/followings/", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  return response.data.data;
};

const GetFeed = async (): Promise<ValidationDTO[]> => {
  const response = await axios.get(API_URL + "/feed", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  return response.data.data;
};

const LikeUnlike = async (validationId: number) => {
  const response = await axios.post(
    `${API_URL}/validation/${validationId}/likes`,
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
  const response = await axios.get(API_URL + "/follows/requests/", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  return response.data.data;
};

const SendFollowRequest = async (userId: number) => {
  await axios.post(
    `${API_URL}/follows/follow/${userId}`,
    {},
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );
};

const AcceptFollowRequest = async (userId: number) => {
  const response = await axios.put(
    `${API_URL}/follows/accept/${userId}`,
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
  await axios.delete(`${API_URL}/follows/following/${userId}`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
};

const DeleteFollower = async (userId: number) => {
  await axios.delete(`${API_URL}/follows/follower/${userId}`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
};

const SearchUsers = async (word: string): Promise<UserDTO[]> => {
  const users = await axios.get(`${API_URL}/accounts/?username=${word}`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  return users.data.data;
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
  SearchUsers,
  SendFollowRequest,
};
