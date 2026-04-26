\connect icecream_shop_db

INSERT INTO price (flavor_id, serving_size, price_amount)
SELECT f.flavor_id, sizes.serving_size, sizes.price_amount
FROM flavor f
CROSS JOIN (VALUES
  ('Single Scoop', 4.50),
  ('Double Scoop', 6.50),
  ('Triple Scoop', 8.00),
  ('Pint',        12.00)
) AS sizes(serving_size, price_amount);
