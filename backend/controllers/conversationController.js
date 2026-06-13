import Conversation from "../models/Conversation.js";

export const createConversation = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;

    const existingConversation =
      await Conversation.findOne({
        participants: {
          $all: [senderId, receiverId],
        },
      });


    if (existingConversation) {
      return res.status(200).json(
        existingConversation
      );
    }

    const conversation =
      await Conversation.create({
        participants: [
          senderId,
          receiverId,
        ],
      });

    res.status(201).json(
      conversation
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getUserConversations =
  async (req, res) => {
    try {
      const conversations =
        await Conversation.find({
          participants: req.params.userId,
        })
          .populate(
            "participants",
            "firstName lastName email mobile"
          )
          .sort({
            lastMessageAt: -1,
          });

      res.status(200).json(
        conversations
      );
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };