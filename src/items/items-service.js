const ItemsService = {
  getAllItems(knex) {
    return knex
      .select(knex.raw("items.*, users.*"))
      .join("users", { "users.id": "items.user_id" })
      .from("items");
  },
  insertItem(knex, newItem) {
    return knex
      .insert(newItem)
      .into("items")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
  getItemsById(knex, id) {
    return knex.from("items").select("*").where("id", id).first();
  },
  deleteItem(knex, item_id) {
    return knex("items").where("id", item_id).delete();
  },
};

module.exports = ItemsService;
