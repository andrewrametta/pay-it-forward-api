const ConversationsService = {
  getAll(knex) {
    return knex.select("*").from("conversations");
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
  getConversationsById(knex, user_id) {
    return knex
      .from("conversations")
      .select("*")
      .where(function () {
        this.where("user_id", user_id).orWhere("user2_id", user_id);
      })
      .first();
  },
};

module.exports = ConversationsService;
