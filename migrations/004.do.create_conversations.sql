DROP TABLE IF EXISTS conversations;

CREATE TABLE conversations (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    user_id INTEGER
        REFERENCES users(id),
    user2_id INTEGER
        REFERENCES users(id)
);