const express = require("express");
const uploadRouter = express.Router();
const { cloudinary } = require("../../utilities/cloundinary");

uploadRouter.post("/", async (req, res) => {
  try {
    const fileString = req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(fileString, {
      upload_preset: "payitforward",
      timeout: 100000,
    });
    console.log(uploadResponse);
    console.log(uploadResponse.url);
    res.send(uploadResponse);
    console.log(fileString);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});

module.exports = uploadRouter;
