const ConversationsService = {
  //   getAll(knex) {
  //     return knex.select("*").from("conversations");
  //   },
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
      .select(
        knex.raw(
          "conversations.*, users.username, users2.username as username2, users.user_url, users2.user_url as user2_url"
        )
      )
      .join("users", { "users.id": "conversations.user_id" })
      .join("users as users2", { "users2.id": "conversations.user2_id" })
      .where(function () {
        this.where("user_id", user_id).orWhere("user2_id", user_id);
      });
  },
};

module.exports = ConversationsService;
