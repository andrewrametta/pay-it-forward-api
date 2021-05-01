const ImgService = {
  getImgById(knex, id) {
    return knex.from("img").where({ id: id }).first();
  },
};

module.exports = ImgService;
