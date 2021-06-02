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
    let user = {
      username: "testAuth",
      password: "P@ssword12!",
      email: "test@email.com",
      date_created: "2021-03-16T13:30:06.300Z",
      user_type: "user",
      user_url: "testimage.com",
      address: "101 st lane",
      city: "Tampa",
      state: "FL",
      zip: "33609",
      cur_status: "available",
    };
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
            id: 3,
            user_id: 1,
            org_id: null,
            title: "couch",
            description: "a brown leather couch",
            item_url: "couchimage@image.com",
            username: "testAuth",
            user_url: "testimage.com",
            address: "101 st lane",
            city: "Tampa",
            state: "FL",
            cur_status: "available",
          },
          {
            id: 1,
            user_id: 1,
            org_id: null,
            title: "chair",
            description: "a black desk chair",
            item_url: "chairimage@image.com",
            username: "testAuth",
            user_url: "testimage.com",
            address: "101 st lane",
            city: "Tampa",
            state: "FL",
            cur_status: "available",
          },
          {
            id: 2,
            user_id: 2,
            org_id: null,
            title: "fridge",
            description: "a white fridge",
            item_url: "fridgeimage@image.com",
            username: "testuser1",
            user_url: "testimage.com",
            address: "101 st lane",
            city: "Tampa",
            state: "FL",
            cur_status: "available",
          },
        ];
        return supertest(app).get("/api/items").expect(200, expectedItems);
      });
    });
  });
  describe("POST /api/items", () => {
    it("creates an item, responding with 201 and new items", () => {
      const newItem = {
        org_id: null,
        title: "test title",
        description: "this is a test description",
        item_url: "test@image.com",
        cur_status: "available",
      };
      return supertest(app)
        .post("/api/items")
        .set("Authorization", `bearer ${authToken}`)
        .send(newItem)
        .expect(201)
        .expect((res) => {
          expect(res.body.org_id).to.equal(newItem.org_id);
          expect(res.body.title).to.equal(newItem.title);
          expect(res.body.description).to.equal(newItem.description);
          expect(res.body.item_url).to.equal(newItem.item_url);
          expect(res.body.cur_status).to.equal(newItem.cur_status);
        });
    });
    const requiredFields = ["title", "description", "item_url"];

    requiredFields.forEach((field) => {
      const newItem = {
        org_id: null,
        title: "test title",
        description: "this is a test description",
        item_url: "test@image.com",
        username: "testuser1",
        user_url: "testimage.com",
        address: "101 st lane",
        city: "Tampa",
        state: "FL",
        cur_status: "available",
      };

      it(`responds with 400 and an error message when the '${field}' is missing`, () => {
        delete newItem[field];

        return supertest(app)
          .post("/api/items")
          .set("Authorization", `bearer ${authToken}`)
          .send(newItem)
          .expect(400, {
            error: { message: `'${field}' is required` },
          });
      });
    });
  });

  describe("GET /api/conversations", () => {
    context("Given there are users and conversations in database", () => {
      const testUsers = makeUsersArray();
      const testConversations = makeConversationsArray();
      beforeEach("insert users", () => {
        return db
          .into("users")
          .insert(testUsers)
          .then(() => {
            return db.into("conversations").insert(testConversations);
          });
      });

      it("responds with 200 and conversations", () => {
        const expectedConversations = [
          {
            id: 1,
            user_id: 1,
            user2_id: 3,
            username: "testAuth",
            username2: "testuser2",
          },
        ];
        return supertest(app)
          .get("/api/conversations")
          .set("Authorization", `bearer ${authToken}`)
          .expect(200, expectedConversations);
      });
    });
  });
  describe("POST /api/conversations", () => {
    const requiredFields = ["user_id", "user2_id"];

    requiredFields.forEach((field) => {
      const newConversation = {
        user_id: 1,
        user2_id: 3,
      };

      it(`responds with 400 and an error message when the '${field}' is missing`, () => {
        delete newConversation[field];

        return supertest(app)
          .post("/api/conversations")
          .set("Authorization", `bearer ${authToken}`)
          .send(newConversation)
          .expect(400, {
            error: { message: `'${field}' is required` },
          });
      });
    });
  });
  describe("GET /api/messages", () => {
    context("Given there are users and messages in database", () => {
      const testUsers = makeUsersArray();
      const testConversations = makeConversationsArray();
      const testMessages = makeMessagesArray();
      beforeEach("insert users", () => {
        return db
          .into("users")
          .insert(testUsers)
          .then(() => {
            return db
              .into("conversations")
              .insert(testConversations)
              .then(() => {
                return db.into("messages").insert(testMessages);
              });
          });
      });
      it("responds with 200 and messages", () => {
        expectedMessages = [
          {
            conversations_id: 1,
            id: 1,
            message_status: null,
            user_id: 1,
            text: "Is this still available?",
            timestamp:
              "Tue Mar 16 2021 00:00:00 GMT-0400 (Eastern Daylight Time)",
            username: "testAuth",
          },
          {
            id: 2,
            message_status: null,
            conversations_id: 1,
            user_id: 3,
            text: "yes, are you free for pick up?",
            timestamp:
              "Tue Mar 16 2021 00:00:00 GMT-0400 (Eastern Daylight Time)",
            username: "testuser2",
          },
        ];
        return supertest(app)
          .get("/api/messages/1")
          .set("Authorization", `bearer ${authToken}`)
          .expect(200, expectedMessages);
      });
    });
  });
});
