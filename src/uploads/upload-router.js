const express = require("express");
const xss = require("xss");
const uploadRouter = express.Router();
const UploadService = require("./upload-service");
//const { requireAuth } = require("../middleware/jwt-auth");

const serializeImg = (img) => ({
  id: img.id,
  name: xss(img.name),
  img: xss(img.img),
});
uploadRouter.route("/").post(
  /*requireAuth*/ (req, res, next) => {
    const { name, data } = req.files.pic;
    console.log(name);
    console.log(data);
    console.log({ req });
    const newImg = { name, data };
    console.log(newImg);
    // const newImg = req.files.pic;
    // const name = newImg.name;
    // const data = newImg.data;
    UploadService.insertImg(req.app.get("db"), newImg)
      .then((img) => {
        res.status(201); //.location(`/img/${img.id}`).json(serializeImg(img));
      })
      .catch(next);
  }
);

module.exports = uploadRouter;
