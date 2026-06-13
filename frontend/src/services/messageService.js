import API from "./api";

export const sendMessage = (data) => {
  return API.post("/messages", data);
};

export const getMessages = (
  conversationId
) => {
  return API.get(
    `/messages/${conversationId}`
  );
};