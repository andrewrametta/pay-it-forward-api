const express = require("express");
const xss = require("xss");
const ItemsService = require("./items-service");
const { requireAuth } = require("../middleware/jwt-auth");

const itemsRouter = express.Router();

const serializeItem = (item) => ({
  id: item.id,
  user_id: item.user_id,
  org_id: item.org_id,
  cur_status: item.cur_status,
  title: xss(item.title),
  description: xss(item.description),
  item_url: xss(item.item_url),
  username: item.username,
  address: item.address,
  city: item.city,
  state: item.state,
  user_url: item.user_url,
});

itemsRouter
  .route("/")
  .get((req, res, next) => {
    ItemsService.getAllItems(req.app.get("db"))
      .then((items) => {
        res.json(items.map(serializeItem));
      })
      .catch(next);
  })
  .post(requireAuth, (req, res, next) => {
    const { cur_status, title, description, item_url } = req.body;
    const newItem = { cur_status, title, description, item_url };

    for (const [key, value] of Object.entries(newItem))
      if (value == null)
        return res.status(400).json({
          error: { message: `'${key}' is required` },
        });
    newItem.user_id = req.user.id;
    ItemsService.insertItem(req.app.get("db"), newItem)
      .then((item) => {
        res.status(201).location(`/items/${item.id}`).json(serializeItem(item));
      })
      .catch(next);
  });

itemsRouter
  .route("/:item_id")
  .all((req, res, next) => {
    const { item_id } = req.params;
    ItemsService.getItemById(req.app.get("db"), item_id)
      .then((item) => {
        if (!item) {
          return res.status(404).json({ error: { message: "Item Not Found" } });
        }
        res.item = item;
        next();
      })
      .catch(next);
  })
  .get((req, res) => {
    res.json(serializeItem(res.item));
  })
  .delete((req, res, next) => {
    console.log(req.params);
    console.log(req.params.item_id);
    ItemsService.deleteItem(req.app.get("db"), req.params.item_id)
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  })
  .patch((req, res, next) => {
    const { title, description, cur_status } = req.body;
    const itemToUpdate = { title, description, cur_status };
    const numberOfValues = Object.values(itemToUpdate).filter(Boolean).length;
    if (numberOfValues === 0) {
      return res.status(400).json({
        error: {
          message: `Request body must contain either 'title', 'description', 'cur_status'`,
        },
      });
    }
    const id = req.params.item_id;
    ItemsService.updateItem(req.app.get("db"), id, itemToUpdate)
      .then((rowsAffected) => {
        console.log({ ...itemToUpdate });
        res.status(204).json({ ...itemToUpdate, id: req.params.id });
      })
      .catch(next);
  });

module.exports = itemsRouter;
