const express = require("express");
const xss = require("xss");
const MessagesService = require("./messages-service");
const { requireAuth } = require("../middleware/jwt-auth");

const messagesRouter = express.Router();

const serializeMessage = (message) => ({
  id: message.id,
  conversations_id: message.conversations_id,
  user_id: message.user_id,
  text: xss(message.text),
  timestamp: xss(message.timestamp),
  message_status: message.message_status,
  username: message.username,
});

messagesRouter.route("/").post(requireAuth, (req, res, next) => {
  const { conversations_id, text, message_status } = req.body;
  const newMessage = {
    conversations_id,
    text,
    message_status,
  };

  for (const [key, value] of Object.entries(newMessage))
    if (value == null)
      return res.status(400).json({
        error: { message: `'${key}' is required` },
      });
  newMessage.user_id = req.user.id;
  MessagesService.insertMessage(req.app.get("db"), newMessage)
    .then((message) => {
      res.status(201).json(serializeMessage(message));
    })
    .catch(next);
});

messagesRouter.route("/:conversations_id").get((req, res, next) => {
  const conversations_id = req.params.conversations_id;
  MessagesService.getMessagesByConversationId(
    req.app.get("db"),
    conversations_id
  )

    .then((messages) => {
      res.json(messages.map(serializeMessage));
    })
    .catch(next);
});

module.exports = messagesRouter;
