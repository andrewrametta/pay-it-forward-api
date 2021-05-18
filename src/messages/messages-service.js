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
};

module.exports = MessagesService;
