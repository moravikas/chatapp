import API from "./api";

export const createConversation = (
  data
) => {
  return API.post(
    "/conversations",
    data
  );
};

export const getConversations = (
  userId
) => {
  return API.get(
    `/conversations/${userId}`
  );
};