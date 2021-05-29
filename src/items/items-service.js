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
  getItemById(knex, item_id) {
    return knex.from("items").select("*").where("id", item_id).first();
  },
  deleteItem(knex, item_id) {
    return knex("items").where("id", item_id).delete();
  },
  updateItem(knex, item_id, newItemFields) {
    return knex("items").where("id", item_id).update(newItemFields);
  },
};

module.exports = ItemsService;
