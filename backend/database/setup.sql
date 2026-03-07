-- Create database
DROP DATABASE icecream_shop_db;
DROP USER shop_owner;
CREATE USER shop_owner WITH CREATEROLE ENCRYPTED PASSWORD 'db_password';
CREATE DATABASE icecream_shop_db WITH OWNER shop_owner;

\connect icecream_shop_db
CREATE SCHEMA icecream;
ALTER USER shop_owner SET SEARCH_PATH TO icecream;

CREATE TABLE icecream.owner (
  owner_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE icecream.shop (
  shop_id SERIAL PRIMARY KEY,
  owner_id INT NOT NULL REFERENCES icecream.owner(owner_id) ON DELETE RESTRICT,
  address TEXT,
  phone_number VARCHAR(20),
  instagram VARCHAR(255),
  logo_filename VARCHAR(255)
);

CREATE TABLE icecream.menu (
  menu_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  created_by INT NOT NULL REFERENCES icecream.owner(owner_id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  img_url TEXT
);

CREATE TABLE icecream.flavor (
  flavor_id SERIAL PRIMARY KEY,
  menu_id INT NOT NULL REFERENCES icecream.menu(menu_id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE icecream.price (
  price_id SERIAL PRIMARY KEY,
  flavor_id INT NOT NULL REFERENCES icecream.flavor(flavor_id) ON DELETE CASCADE,
  serving_size VARCHAR(20) NOT NULL,
  price_amount NUMERIC(10, 2) NOT NULL,
  last_updated TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE icecream.theme (
  theme_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  background_color VARCHAR(50),
  font_style VARCHAR(100),
  accent_color VARCHAR(50)
);

CREATE TABLE icecream.screen (
  screen_id SERIAL PRIMARY KEY,
  location_name VARCHAR(255) NOT NULL,
  device_identifier VARCHAR(255) NOT NULL UNIQUE,
  menu_id INT NOT NULL REFERENCES icecream.menu(menu_id) ON DELETE RESTRICT,
  theme_id INT NOT NULL REFERENCES icecream.theme(theme_id) ON DELETE RESTRICT,
  last_synced TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE icecream.feedback (
  feedback_id SERIAL PRIMARY KEY,
  shop_id INT NOT NULL REFERENCES icecream.shop(shop_id) ON DELETE CASCADE,
  customer_name VARCHAR(255),
  customer_email VARCHAR(255),
  message TEXT NOT NULL,
  submitted_at TIMESTAMP NOT NULL DEFAULT NOW(),
  status VARCHAR(50) NOT NULL DEFAULT 'pending'
);
