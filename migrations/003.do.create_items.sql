DROP TABLE IF EXISTS items;

DROP TYPE IF EXISTS status;
CREATE TYPE status as ENUM(
    'available',
    'claimed',
    'deleted'
);

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    user_id INTEGER
        REFERENCES users(id),
    org_id INTEGER
        REFERENCES organizations(id),
    cur_status status,
    title TEXT,
    description TEXT,
    item_url VARCHAR(200) NOT NULL
);