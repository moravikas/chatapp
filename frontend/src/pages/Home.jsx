import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import ChatHeader from "../components/ChatHeader";
import MessageList from "../components/MessageList";
import MessageInput from "../components/MessageInput";

import { useAuth } from "../context/AuthContext";

import { getUsers } from "../services/userService";

import {
  getConversations,
} from "../services/conversationService";

import {
  createConversation,
} from "../services/conversationService";
import {
  getMessages,
  sendMessage,
} from "../services/messageService";

import "../styles/Home.css";

function Home() {
  const { user } = useAuth();

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const [selectedUser, setSelectedUser] =
    useState(null);

  const [conversationId, setConversationId] =
    useState(null);

  const [messages, setMessages] = useState([]);

  const currentUserId = user?._id || user?.id;
  const normalizedSearch = search.trim().toLowerCase();

  useEffect(() => {
    const fetchSidebarUsers = async () => {
      try {
        const [usersRes, conversationsRes] =
          await Promise.all([
            getUsers(),
            getConversations(currentUserId),
          ]);

        const conversationMap = new Map();

        conversationsRes.data.forEach(
          (conversation) => {
            const otherUser =
              conversation.participants.find(
                (participant) =>
                  participant._id.toString() !==
                  currentUserId.toString()
              );

            if (otherUser?._id) {
              conversationMap.set(
                otherUser._id.toString(),
                {
                  conversationId:
                    conversation._id,
                  lastMessage:
                    conversation.lastMessage,
                  lastMessageAt:
                    conversation.lastMessageAt,
                }
              );
            }
          }
        );

        const sidebarUsers = usersRes.data
          .filter(
            (entry) =>
              entry._id.toString() !==
              currentUserId.toString()
          )
          .map((entry) => ({
            ...entry,
            ...(conversationMap.get(
              entry._id.toString()
            ) || {}),
          }));

        setUsers(sidebarUsers);
      } catch (error) {
        console.log(error);
      }
    };

    if (currentUserId) {
      fetchSidebarUsers();
    }
  }, [currentUserId]);

  // Select User

  const handleSelectUser = async (
    selected
  ) => {
    try {
      setSelectedUser(selected);

      const res =
        await createConversation({
          senderId: currentUserId,
          receiverId: selected._id,
        });

      setConversationId(
        res.data._id
      );

      const messageRes =
        await getMessages(
          res.data._id
        );

      setMessages(
        messageRes.data
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Send Message

  const handleSendMessage =
    async (text) => {
      try {
        const res =
          await sendMessage({
            conversationId,
            senderId: currentUserId,
            receiverId:
              selectedUser._id,
            text,
          });

        setMessages((prev) => [
          ...prev,
          res.data,
        ]);
      } catch (error) {
        console.log(error);
      }
    };

  const filteredUsers = users.filter(
    (u) => {
      const normalizedMobile = String(
        u.mobile || ""
      ).replace(/\D/g, "");
      const searchMobile = search
        .replace(/\D/g, "")
        .trim();

      return (
        `${u.firstName || ""} ${u.lastName || ""
          }`
          .toLowerCase()
          .includes(normalizedSearch) ||
        (u.email || "")
          .toLowerCase()
          .includes(normalizedSearch) ||
        (searchMobile &&
          normalizedMobile.includes(searchMobile))
      );
    }
  );

  return (
    <div className="home">
      <Sidebar
        users={filteredUsers}
        search={search}
        setSearch={setSearch}
        onSelect={
          handleSelectUser
        }
      />

      <div className="chat-section">
        <ChatHeader
          selectedUser={
            selectedUser
          }
        />


        <MessageList
          messages={messages}
          currentUserId={
            user?.id
          }
        />

        {selectedUser && (
          <MessageInput
            onSend={
              handleSendMessage
            }
          />
        )}
      </div>
    </div>
  );
}

export default Home;