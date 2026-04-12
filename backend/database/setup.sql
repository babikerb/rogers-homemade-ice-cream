-- Create database
CREATE DATABASE icecream_shop_db;

\connect icecream_shop_db

CREATE TABLE owner (
  owner_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE shop (
  shop_id SERIAL PRIMARY KEY,
  owner_id INT NOT NULL REFERENCES owner(owner_id) ON DELETE RESTRICT,
  street VARCHAR(55),
  city VARCHAR(20),
  state VARCHAR(2),
  phone_number VARCHAR(20),
  instagram VARCHAR(255),
  open_time INT NOT NULL,
  close_time INT NOT NULL,
  logo_filename VARCHAR(255)
);

CREATE TABLE menu (
  menu_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  created_by INT NOT NULL REFERENCES owner(owner_id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  img_url TEXT
);

CREATE TABLE flavor (
  flavor_id SERIAL PRIMARY KEY,
  menu_id INT NOT NULL REFERENCES menu(menu_id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE price (
  price_id SERIAL PRIMARY KEY,
  flavor_id INT NOT NULL REFERENCES flavor(flavor_id) ON DELETE CASCADE,
  serving_size VARCHAR(20) NOT NULL,
  price_amount NUMERIC(10, 2) NOT NULL,
  last_updated TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE theme (
  theme_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  background_color VARCHAR(50),
  font_style VARCHAR(100),
  accent_color VARCHAR(50)
);

CREATE TABLE screen (
  screen_id SERIAL PRIMARY KEY,
  location_name VARCHAR(255) NOT NULL,
  device_identifier VARCHAR(255) NOT NULL UNIQUE,
  menu_id INT NOT NULL REFERENCES menu(menu_id) ON DELETE RESTRICT,
  theme_id INT NOT NULL REFERENCES theme(theme_id) ON DELETE RESTRICT,
  last_synced TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE feedback (
  feedback_id SERIAL PRIMARY KEY,
  shop_id INT NOT NULL REFERENCES shop(shop_id) ON DELETE CASCADE,
  customer_name VARCHAR(255),
  customer_email VARCHAR(255),
  message TEXT NOT NULL,
  submitted_at TIMESTAMP NOT NULL DEFAULT NOW(),
  status VARCHAR(50) NOT NULL DEFAULT 'pending'
);

-- Insert starting shop
INSERT INTO owner (
  name,
  email,
  password_hash
) VALUES (
  'Admin',
  'admin@admin.com',
  'hash'
);

INSERT INTO shop (
  owner_id,
  street,
  city,
  state,
  phone_number,
  instagram,
  open_time,
  close_time
) VALUES (
  (SELECT owner_id FROM owner WHERE name = 'Admin'),
  '1510 E Lincoln Ave',
  'Orange',
  'CA',
  '(657) 335-9987',
  'rogershomemadeicecream',
  720,
  1260
);

WITH admin AS (
  SELECT owner_id FROM owner WHERE name = 'Admin'
)
INSERT INTO menu (name, created_by)
SELECT name, owner_id
FROM (VALUES ('Ice Cream'), ('Italian Ice'), ('Banana Split'), ('Shake'), ('Sunday')) AS items(name)
CROSS JOIN admin;

WITH menu AS (
  SELECT menu_id FROM menu WHERE name = 'Ice Cream'
)
INSERT INTO flavor (menu_id, name)
SELECT menu_id, name
FROM (VALUES 
    ('Banana'),
    ('Berry Yogurt'),
    ('Black Walnut'),
    ('Blueberry Cheesecake'),
    ('Blue Monster'),
    ('Brownie'),
    ('Birthday Cake'),
    ('Bubblegum'),
    ('Butter Pecan'),
    ('Butterscotch Crunch'),
    ('Cherry'),
    ('Chocolate Chip'),
    ('Chocolate Oreo'),
    ('Cinnamon Toast Crunch'),
    ('Coconut pineapple'),
    ('Coffee'),
    ('Cookie dough'),
    ('Cookies & Cream'),
    ('Corn'),
    ('Dark Chocolate'),
    ('Eggnog'),
    ('Fruity Pebbles'),
    ('Guava'),
    ('Kit Kat'),
    ('Key-lime Pie'),
    ('Lime'),
    ('Mango'),
    ('Milk & Cookies'),
    ('Milk Chocolate'),
    ('Mint & Chip'),
    ('Orange Cream Float'),
    ('Oreo Cheesecake'),
    ('Pistachio'),
    ('Pralines & Cream'),
    ('Raspberry Swirl'),
    ('Rainbow Sherbet'),
    ('Reese''s Peanut Butter Cup'),
    ('Rocky Road'),
    ('Salted Caramel'),
    ('Snickers'),
    ('Strawberries & Cream'),
    ('Strawberry'),
    ('Strawberry Cheesecake'),
    ('Super Nutty'),
    ('S''mores'),
    ('Taro'),
    ('Twix'),
    ('Vanilla'),
    ('Vanilla w/ Carmel')
  ) AS flavors(name)
CROSS JOIN menu;

WITH menu AS (
  SELECT menu_id FROM menu WHERE name = 'Italian Ice'
)
INSERT INTO flavor (menu_id, name)
SELECT menu_id, name
FROM (VALUES 
    ('Blue Raspberry'),
    ('Cherry'),
    ('Cotton Candy'),
    ('Lemon'),
    ('Mango'),
    ('Mango w/ Chamoy'),
    ('Orange'),
    ('Pineapple'),
    ('Root Beer'),
    ('Sour Apple'),
    ('Strawberry'),
    ('Strawberry Lemonade'),
    ('Watermelon')
  ) AS flavors(name)
CROSS JOIN menu;