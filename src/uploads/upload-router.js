const express = require("express");
const uploadRouter = express.Router();
const { cloudinary } = require("../../utilities/cloundinary");

// uploadRouter.post("/", async (req, res) => {
//   try {
//     const fileString = req.body.data;
//     const uploadResponse = await cloudinary.uploader.upload(fileString, {
//       upload_preset: "payitforward",
//       timeout: 100000,
//     });
//     console.log(uploadResponse);
//     console.log(uploadResponse.url);
//     res.send(uploadResponse);
//     console.log(fileString);
//   } catch (error) {
//     console.error(error);
//     res.send(error);
//   }
// });

uploadRouter.route("/").post((req, res, next) => {
  const fileString = req.body.data;
  cloudinary.uploader
    .upload(fileString, {
      upload_preset: "payitforward",
      timeout: 100000,
    })
    .then((img) => {
      res.status(201).send(img);
    })
    .catch(next);
});

module.exports = uploadRouter;
