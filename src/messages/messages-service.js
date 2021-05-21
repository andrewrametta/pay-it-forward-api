const MessagesService = {
  getAllMessages(knex) {
    return knex.select("*").from("messages");
  },
  insertItem(knex, newMessage) {
    return knex
      .insert(newMessage)
      .into("messages")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
  getMessageById(knex, id) {
    return knex.from("messages").select("*").where("id", id).first();
  },
  getMessagesByConversationId(knex, conversation_id) {
    return knex
      .from("messages")
      .select(knex.raw("messages.*, users.username"))
      .join("users", { "users.id": "messages.user_id" })
      .where("conversations_id", conversation_id);
  },
};

module.exports = MessagesService;
