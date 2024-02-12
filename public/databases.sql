CREATE TABLE sections (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE,
    html_id TEXT UNIQUE,
    img_url TEXT
);

CREATE TABLE subsections (
    id SERIAL PRIMARY KEY,
    parent_section_name TEXT,
    subsection_name TEXT UNIQUE,
    html_id TEXT UNIQUE,
    img_url TEXT
);

CREATE TABLE content (
    id SERIAL PRIMARY KEY,
    subsection_id TEXT,
    content_type TEXT,
    param1 TEXT,
    param2 TEXT
);