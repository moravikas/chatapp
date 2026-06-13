import Message from "../models/Message.js";
import Conversation from "../models/Conversation.js";

export const sendMessage = async (
  req,
  res
) => {
  try {
    const {
      conversationId,
      senderId,
      receiverId,
      text,
    } = req.body;

    const message =
      await Message.create({
        conversationId,
        senderId,
        receiverId,
        text,
      });

    await Conversation.findByIdAndUpdate(
      conversationId,
      {
        lastMessage: text,
        lastMessageAt: new Date(),
      }
    );

    res.status(201).json(
      message
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getMessages =
  async (req, res) => {
    try {
      const messages =
        await Message.find({
          conversationId:
            req.params.conversationId,
        })
          .populate(
            "senderId",
            "firstName"
          )
          .sort({
            createdAt: 1,
          });

      res.status(200).json(
        messages
      );
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };