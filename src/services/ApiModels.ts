export type ErrorResponse = {
  message: string;
};

export type UserLoginDTO = {
  username: string;
  password: string;
};

export type UserDTO = {
  id: number;
  username: string;
  email: string;
  password: string;
  isPremium: boolean;
  imageUrl: string;
  createdAt: string;
  status: null | "following" | "requested" | "not_following";
  updatedAt: Date;
};

export type AccountDTO = {
  username: string;
  email: string;
  imageUrl: string;
  isPremium: boolean;
  followers: UserDTO[] | null;
  followings: UserDTO[] | null;
  habits: HabitDTO[] | null;
  numberOfFollowers: number;
  numberOfFollowings: number;
  createdAt: number | string | Date;
  habitCount: number;
};

export type CreateUserDTO = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginResponse = {
  data: UserDTO;
  message: string | undefined;
  token: string;
};

export type CreateUserResponseDTO = {
  token: string;
  data: UserDTO;
  message: string | undefined;
};

export type HabitForValidationDTO = {
  id: number;
  name: string;
  user: UserDTO;
};

export type CreateHabitDTO = {
  name: string;
  frequency: string;
  occurency: number;
  categoryName: string;
  visibility: boolean;
};

export type CategoryDTO = {
  id: number;
  name: string;
};

export type HabitDTO = {
  id: number;
  visibility: boolean;
  name: string;
  frequency: "WEEKLY" | "DAILY" | "MONTHLY";
  occurency: number;
  userId: number;
  deleted: boolean;
};

export type ValidationDTO = {
  id: number;
  difficulty: number;
  validatedAt: string;
  message: string;
  counter: number;
  Habit: HabitForValidationDTO;
  isValid: boolean;
  isLiked: boolean | null;
  likedBy: Array<{ userId: number }>;
  _count: { likedBy: number };
};
