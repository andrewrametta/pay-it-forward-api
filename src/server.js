const knex = require("knex");
const socket = require("socket.io");
const app = require("./app");

const { PORT, DATABASE_URL } = require("./config");

const db = knex({
  client: "pg",
  connection: DATABASE_URL,
});

app.set("db", db);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

// io = socket(server);

// io.on("connection", (socket) => {
//   console.log(socket.id);

//   socket.io("join_room", (data) => {
//     socket.join(data);
//     console.log("User Joined Room:" + data);

//   });

//   socket.on("disconnect", () => {
//     console.log("USER DISCONNECTED");
//   });
// });
