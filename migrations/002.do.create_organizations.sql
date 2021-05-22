DROP TABLE IF EXISTS organizations;

CREATE TABLE organizations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER
        REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    name TEXT,
    description TEXT,
    org_img_url VARCHAR(200)
);

