function makeItemsArray() {
  return [
    {
      user_id: 1,
      cur_status: "available",
      title: "chair",
      description: "a black desk chair",
      item_url: "chairimage@image.com",
    },
    {
      user_id: 2,
      cur_status: "available",
      title: "fridge",
      description: "a white fridge",
      item_url: "fridgeimage@image.com",
    },
    {
      user_id: 1,
      cur_status: "available",
      title: "couch",
      description: "a brown leather couch",
      item_url: "couchimage@image.com",
    },
  ];
}

module.exports = makeItemsArray;
