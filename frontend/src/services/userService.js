import API from "./api";

export const getUsers = () => {
  return API.get("/users");
};