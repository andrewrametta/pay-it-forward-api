const ConversationsService = {
  getAll(knex) {
    return knex.select("*").from("items");
  },
  insertConversation(knex, newConversation) {
    return knex
      .insert(newConversation)
      .into("conversations")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
  getConversationById(knex, userId, orgId) {
    return knex
      .from("conversations")
      .select("*")
      .where("user_id", orgId)
      .where("user2_id", userId)
      .first();
  },
};

module.exports = ConversationsService;
