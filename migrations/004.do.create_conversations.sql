DROP TABLE IF EXISTS conversations;

CREATE TABLE conversations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER
        REFERENCES users(id),
    user2_id INTEGER
        REFERENCES users(id),
    item_id INTEGER
        REFERENCES item(id)
);