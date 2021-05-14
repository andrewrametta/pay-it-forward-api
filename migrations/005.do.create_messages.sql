DROP TABLE IF EXISTS messages;

DROP TYPE IF EXISTS readstatus;
CREATE TYPE readstatus as ENUM(
    'seen',
    'not seen',
    'deleted'
);

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    conversations_id INTEGER
        REFERENCES conversations(id),
    user_id INTEGER
        REFERENCES users(id),
    text TEXT,
    timestamp DATE DEFAULT now() NOT NULL,
    message_status readstatus

);