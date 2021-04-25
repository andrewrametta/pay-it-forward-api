const UploadService = {
  insertImg(knex, newImg) {
    return knex
      .insert(newImg)
      .into("imgs")
      .returning("*")
      .then((rows) => {
        console.log(rows);
        return rows[0];
      });
  },
};

module.exports = UploadService;
