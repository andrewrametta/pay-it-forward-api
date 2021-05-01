const express = require("express");
const imgRouter = express.Router();
const ImgService = require("./img-services");

imgRouter.route("/:id").get((req, res, next) => {
  const id = req.params.id;
  ImgService.getImgById(req.app.get("db"), id)
    .then((img) => {
      if (!img) {
        return res.status(404).json({
          error: { message: "Img Not Found" },
        });
      }
      res.end(img.img);
    })
    .catch(next);
});
module.exports = imgRouter;
