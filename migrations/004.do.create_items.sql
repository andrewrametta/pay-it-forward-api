DROP TABLE IF EXISTS items;

DROP TYPE IF EXISTS status;
CREATE TYPE status as ENUM(
    'available',
    'claimed'
);

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    user_id INTEGER
        REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    org_id INTEGER
        REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
    cur_status status,
    title TEXT,
    description TEXT,
    img_id INTEGER
        REFERENCES imgs(id) ON DELETE CASCADE NOT NULL
);