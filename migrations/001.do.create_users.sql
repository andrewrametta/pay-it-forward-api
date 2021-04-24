DROP TABLE IF EXISTS users;

DROP TYPE IF EXISTS typeof;
CREATE TYPE typeof as ENUM(
    'user',
    'admin',
    'org'
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    date_created DATE DEFAULT now() NOT NULL,
    user_type typeof
);