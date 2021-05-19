const express = require("express");
const xss = require("xss");
const MessagesService = require("./messages-service");
const { requireAuth } = require("../middleware/jwt-auth");

const messagesRouter = express.Router();

const serializeMessage = (message) => ({
  id: message.id,
  conversation_id: message.conversation_id,
  user_id: message.user_id,
  text: xss(message.text),
  timestamp: xss(message.timestamp),
  message_status: message.message_status,
});

messagesRouter
  .route("/")
  .get((req, res, next) => {
    MessagesService.getAllMessages(req.app.get("db"))
      .then((messages) => {
        res.json(messages.map(serializeMessage));
      })
      .catch(next);
  })
  .post(requireAuth, (req, res, next) => {
    const { conversation_id, user_id, text, status } = req.body;
    const newMessage = { conversation_id, user_id, text, status };

    for (const [key, value] of Object.entries(newMessage))
      if (value == null)
        return res.status(400).json({
          error: { message: `'${key}' is required` },
        });
    newMessage.user_id = req.user.id;
    MessagesService.insertMessage(req.app.get("db"), newMessage)
      .then((message) => {
        res
          .status(201)
          .location(`/messages/${message.id}`)
          .json(serializeMessage(message));
      })
      .catch(next);
  });

module.exports = messagesRouter;
