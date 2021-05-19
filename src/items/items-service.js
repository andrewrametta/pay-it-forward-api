const ItemsService = {
  getAllItems(knex) {
    return knex.select("*").from("items");
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
};

module.exports = ItemsService;
