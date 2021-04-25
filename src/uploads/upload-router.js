const express = require("express");
const xss = require("xss");
const UploadService = require("./upload-service");
const { requireAuth } = require("../middleware/jwt-auth");

const uploadRouter = express.Router();

const serializeImg = (img) => ({
  id: img.id,
  name: xss(img.name),
  img: xss(img.img),
});
uploadRouter.route("/").post(
  /*requireAuth*/ (req, res, next) => {
    const { name, img } = req.files.pic;
    const newImg = { name, img };
    UploadService.insertImg(req.app.get("db"), newImg)
      .then((img) => {
        res.status(201).location(`/img/${img.id}`).json(serializeImg(img));
      })
      .catch(next);
  }
);
