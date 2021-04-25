const express = requier("express");
const ImgService = require("./img-services");

const imgRouter = express.Router();

imgRouter
  .route("/:img_id")
  .all((req, res, next) => {
    const { img_id } = req.params;
    ImgService.getImgById(req.app.get("db"), img_id)
      .then((img) => {
        if (!img) {
          return res.status(404).json({
            error: { message: "Img Not Found" },
          });
        }
        res.img = img;
      })
      .catch(next);
  })
  .get((req, res) => {
    res.json(res.img);
  });
