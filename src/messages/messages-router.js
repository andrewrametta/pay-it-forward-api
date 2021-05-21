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
  username: message.username,
});

messagesRouter
  .route("/")
  .get((req, res, next) => {
    console.log(req.body);
    const conversation_id = req.body.conversation_id;
    MessagesService.getMessagesByConversationId(
      req.app.get("db"),
      conversation_id
    )

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

messagesRouter.route("/:conversation_id").get((req, res, next) => {
  console.log(req.body);
  const conversation_id = req.params.conversation_id;
  MessagesService.getMessagesByConversationId(
    req.app.get("db"),
    conversation_id
  )

    .then((messages) => {
      res.json(messages.map(serializeMessage));
    })
    .catch(next);
});

module.exports = messagesRouter;
