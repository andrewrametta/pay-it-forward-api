const express = require("express");
const xss = require("xss");
const ConversationsService = require("./conversations-service");
const { requireAuth } = require("../middleware/jwt-auth");

const conversationsRouter = express.Router();

const serializeConversation = (conversation) => ({
  id: conversation.id,
  user_id: conversation.user_id,
  user2_id: conversation.user2_id,
  username: conversation.username,
  username2: conversation.username2,
});

conversationsRouter
  .route("/")
  .get(requireAuth, (req, res, next) => {
    const user_id = req.user.id;

    const user2_id = req.user.id;
    ConversationsService.getConversationsById(
      req.app.get("db"),
      user_id,
      user2_id
    )
      .then((conversation) => {
        res.json(conversation.map(serializeConversation));
      })
      .catch(next);
  })
  .post(requireAuth, (req, res, next) => {
    const { user_id, user2_id } = req.body;
    const newConversation = { user_id, user2_id };

    for (const [key, value] of Object.entries(newConversation))
      if (value == null)
        return res.status(400).json({
          error: { message: `'${key}' is required` },
        });
    // newConversation.user_id = req.user.id;
    // newConversation.user2_id = req.user2_id;
    ConversationsService.insertConversation(req.app.get("db"), newConversation)
      .then((conversation) => {
        res
          .status(201)
          .location(`/conversations/${conversation.id}`)
          .json(serializeConversation(conversation));
      })
      .catch(next);
  });

module.exports = conversationsRouter;
