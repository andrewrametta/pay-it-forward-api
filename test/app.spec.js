const knex = require("knex");
const supertest = require("supertest");
const app = require("../src/app");
const { expect } = require("chai");
const makeUsersArray = require("./users.fixture");
const makeItemsArray = require("./items.fixture");
const makeConversationsArray = require("./conversations.fixture");
const makeMessagesArray = require("./messages.fixture");

describe("Pay it forward", () => {
  let db;
  let authToken;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });

  beforeEach("clean the table", () =>
    db.raw(
      "TRUNCATE  users, organizations, items, conversations, messages RESTART IDENTITY CASCADE;"
    )
  );

  beforeEach("register and login", () => {
    let user = { username: "authtestuser", password: "P@ssword12!" };
    //let users = makeUsersArray();
    return supertest(app)
      .post("/api/users")
      .send(user)
      .then((res) => {
        return supertest(app)
          .post("/api/auth/login")
          .send(user)
          .then((res2) => {
            authToken = res2.body.authToken;
          });
      });
  });

  after("disconnect from db", () => db.destroy());

  describe("GET /api/items", () => {
    context("Given there are users and items in database", () => {
      const testItems = makeItemsArray();
      const testUsers = makeUsersArray();
      beforeEach("insert users", () => {
        return db
          .into("users")
          .insert(testUsers)
          .then(() => {
            return db.into("items").insert(testItems);
          });
      });

      it("responds with 200 and items", () => {
        const expectedItems = [
          {
            id: 1,
            user_id: 1,
            org_id: null,
            title: "couch",
            description: "a brown leather couch",
            item_url: "couchimage@image.com",
          },
          {
            id: 2,
            user_id: 2,
            org_id: null,
            title: "chair",
            description: "a black desk chair",
            item_url: "chairimage@image.com",
          },
          {
            id: 3,
            user_id: 1,
            org_id: null,
            title: "fridge",
            description: "a white fridge",
            item_url: "fridgeimage@image.com",
          },
        ];
        return supertest(app).get("/api/items").expect(200, expectedItems);
      });
    });
  });
});
