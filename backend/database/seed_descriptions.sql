\connect icecream_shop_db

-- Ice Cream
UPDATE flavor SET description = 'Made with real ripe bananas blended into a creamy base. Think banana split without all the toppings.'
  WHERE name = 'Banana' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Ice Cream');

UPDATE flavor SET description = 'Tangy yogurt ice cream with a mix of berry flavors swirled in. Light enough to feel like a good decision.'
  WHERE name = 'Berry Yogurt' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Ice Cream');

UPDATE flavor SET description = 'A classic your grandparents would recognize. Rich black walnuts in a buttery cream base, no frills.'
  WHERE name = 'Black Walnut' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Ice Cream');

UPDATE flavor SET description = 'Cheesecake ice cream with a blueberry swirl and graham cracker pieces throughout.'
  WHERE name = 'Blueberry Cheesecake' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Ice Cream');

UPDATE flavor SET description = 'Bright blue, loaded with gummies and sprinkles, and somehow has a fruity mystery flavor nobody can quite place.'
  WHERE name = 'Blue Monster' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Ice Cream');

UPDATE flavor SET description = 'Chunks of real fudge brownies packed into a dark chocolate base. Good luck stopping at one scoop.'
  WHERE name = 'Brownie' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Ice Cream');

UPDATE flavor SET description = 'Vanilla cake batter ice cream with rainbow sprinkles and a frosting swirl. No occasion required.'
  WHERE name = 'Birthday Cake' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Ice Cream');

UPDATE flavor SET description = 'That classic pink bubblegum flavor you loved as a kid. Still hits the same.'
  WHERE name = 'Bubblegum' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Ice Cream');

UPDATE flavor SET description = 'Toasted pecans in a buttery, slightly sweet cream base. One of the most underrated scoops we make.'
  WHERE name = 'Butter Pecan' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Ice Cream');

UPDATE flavor SET description = 'Smooth butterscotch ice cream with pieces of golden toffee mixed in.'
  WHERE name = 'Butterscotch Crunch' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Ice Cream');

UPDATE flavor SET description = 'A simple, clean cherry flavor in a creamy vanilla base. No frills, just good.'
  WHERE name = 'Cherry' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Ice Cream');

UPDATE flavor SET description = 'Vanilla ice cream with semi-sweet chocolate chips. You know what you are getting and it never disappoints.'
  WHERE name = 'Chocolate Chip' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Ice Cream');

UPDATE flavor SET description = 'Dark chocolate ice cream with crushed Oreos mixed in. Hard to go wrong.'
  WHERE name = 'Chocolate Oreo' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Ice Cream');

UPDATE flavor SET description = 'Ice cream that tastes like the milk left at the bottom of your cereal bowl, with actual Cinnamon Toast Crunch pieces in it.'
  WHERE name = 'Cinnamon Toast Crunch' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Ice Cream');

UPDATE flavor SET description = 'Creamy coconut ice cream with pineapple mixed in. Tastes exactly like a pina colada.'
  WHERE name = 'Coconut pineapple' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Ice Cream');

UPDATE flavor SET description = 'Strong coffee flavor in a smooth, creamy base. Works as dessert or a pick-me-up depending on the time of day.'
  WHERE name = 'Coffee' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Ice Cream');

UPDATE flavor SET description = 'Vanilla ice cream with big chunks of edible chocolate chip cookie dough throughout.'
  WHERE name = 'Cookie dough' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Ice Cream');

UPDATE flavor SET description = 'Vanilla cream and crushed Oreos. The most ordered flavor on the menu for a reason.'
  WHERE name = 'Cookies & Cream' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Ice Cream');

UPDATE flavor SET description = 'Sweet corn ice cream made with real corn. Sounds a little different, tastes really good.'
  WHERE name = 'Corn' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Ice Cream');

UPDATE flavor SET description = 'Rich, slightly bitter dark chocolate ice cream. Not for the milk chocolate crowd.'
  WHERE name = 'Dark Chocolate' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Ice Cream');

UPDATE flavor SET description = 'Thick, spiced eggnog ice cream with nutmeg and vanilla. Great any time of year, not just the holidays.'
  WHERE name = 'Eggnog' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Ice Cream');

UPDATE flavor SET description = 'Vanilla cream loaded with Fruity Pebbles. Bright, colorful, and exactly what it sounds like.'
  WHERE name = 'Fruity Pebbles' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Ice Cream');

UPDATE flavor SET description = 'Tropical guava ice cream with a floral sweetness and real fruit flavor. One of the more unique scoops we offer.'
  WHERE name = 'Guava' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Ice Cream');

UPDATE flavor SET description = 'Chocolate ice cream with chunks of Kit Kat wafers mixed in. Gets a little crunchy in the best way.'
  WHERE name = 'Kit Kat' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Ice Cream');

UPDATE flavor SET description = 'Tart key lime ice cream with a graham cracker swirl. Tastes like the actual pie.'
  WHERE name = 'Key-lime Pie' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Ice Cream');

UPDATE flavor SET description = 'Clean, tart lime ice cream. Refreshing and straightforward.'
  WHERE name = 'Lime' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Ice Cream');

UPDATE flavor SET description = 'Made with real mango. Sweet, fruity, and one of our most popular tropical flavors.'
  WHERE name = 'Mango' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Ice Cream');

UPDATE flavor SET description = 'Ice cream that tastes like milk after dunking cookies in it, with cookie pieces mixed throughout.'
  WHERE name = 'Milk & Cookies' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Ice Cream');

UPDATE flavor SET description = 'Classic milk chocolate ice cream. Smooth, familiar, and good every single time.'
  WHERE name = 'Milk Chocolate' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Ice Cream');

UPDATE flavor SET description = 'Cool mint ice cream with dark chocolate chips throughout. A timeless combo done right.'
  WHERE name = 'Mint & Chip' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Ice Cream');

UPDATE flavor SET description = 'Vanilla ice cream and orange sherbet swirled together. Basically a Dreamsicle in a cup.'
  WHERE name = 'Orange Cream Float' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Ice Cream');

UPDATE flavor SET description = 'Tangy cheesecake ice cream with crushed Oreos and a cream cheese swirl.'
  WHERE name = 'Oreo Cheesecake' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Ice Cream');

UPDATE flavor SET description = 'Lightly nutty pistachio ice cream with a subtle flavor and a naturally pale green color.'
  WHERE name = 'Pistachio' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Ice Cream');

UPDATE flavor SET description = 'Caramel ice cream with praline sauce and roasted pecan pieces throughout.'
  WHERE name = 'Pralines & Cream' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Ice Cream');

UPDATE flavor SET description = 'Vanilla cream with a tart raspberry swirl throughout every scoop.'
  WHERE name = 'Raspberry Swirl' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Ice Cream');

UPDATE flavor SET description = 'Three flavors in one: raspberry, lime, and orange sherbet. A classic for a reason.'
  WHERE name = 'Rainbow Sherbet' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Ice Cream');

UPDATE flavor SET description = 'Chocolate ice cream packed with Reese''s cup pieces. Pretty hard to go wrong here.'
  WHERE name = 'Reese''s Peanut Butter Cup' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Ice Cream');

UPDATE flavor SET description = 'Chocolate ice cream with marshmallows, almonds, and chocolate chunks. The original loaded flavor.'
  WHERE name = 'Rocky Road' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Ice Cream');

UPDATE flavor SET description = 'Buttery caramel ice cream with just enough sea salt to keep it from being too sweet.'
  WHERE name = 'Salted Caramel' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Ice Cream');

UPDATE flavor SET description = 'Caramel and nougat ice cream with Snickers pieces and peanuts throughout.'
  WHERE name = 'Snickers' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Ice Cream');

UPDATE flavor SET description = 'Fresh strawberry pieces in a sweet cream base. Clean, simple, and really good.'
  WHERE name = 'Strawberries & Cream' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Ice Cream');

UPDATE flavor SET description = 'Made with real strawberries. Bright, fruity, and as fresh as ice cream gets.'
  WHERE name = 'Strawberry' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Ice Cream');

UPDATE flavor SET description = 'Cheesecake ice cream with strawberry compote and graham cracker crumbles mixed in.'
  WHERE name = 'Strawberry Cheesecake' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Ice Cream');

UPDATE flavor SET description = 'Almonds, pecans, and walnuts throughout a rich cream base. A lot of nut in every bite.'
  WHERE name = 'Super Nutty' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Ice Cream');

UPDATE flavor SET description = 'Chocolate and marshmallow ice cream with graham cracker chunks. Tastes like summer camp.'
  WHERE name = 'S''mores' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Ice Cream');

UPDATE flavor SET description = 'Made with real taro root. Earthy, mildly sweet, and that deep purple color is all natural.'
  WHERE name = 'Taro' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Ice Cream');

UPDATE flavor SET description = 'Caramel ice cream with shortbread and Twix bar pieces throughout.'
  WHERE name = 'Twix' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Ice Cream');

UPDATE flavor SET description = 'Made from scratch with real vanilla. Simple and done right.'
  WHERE name = 'Vanilla' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Ice Cream');

UPDATE flavor SET description = 'Classic vanilla with a house-made caramel swirl. The caramel is made in-house and it shows.'
  WHERE name = 'Vanilla w/ Carmel' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Ice Cream');

-- Italian Ice
UPDATE flavor SET description = 'Bold blue raspberry with a sweet and tart bite. The color is as intense as the flavor.'
  WHERE name = 'Blue Raspberry' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Italian Ice');

UPDATE flavor SET description = 'Bright, sweet cherry Italian ice. One of the most classic flavors we make.'
  WHERE name = 'Cherry' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Italian Ice');

UPDATE flavor SET description = 'Tastes exactly like cotton candy from a fair, just frozen solid.'
  WHERE name = 'Cotton Candy' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Italian Ice');

UPDATE flavor SET description = 'Sharp, tart lemon Italian ice made with real citrus. Very refreshing.'
  WHERE name = 'Lemon' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Italian Ice');

UPDATE flavor SET description = 'Real mango flavor in Italian ice form. Tropical and intense.'
  WHERE name = 'Mango' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Italian Ice');

UPDATE flavor SET description = 'Mango Italian ice with chamoy sauce on top. Sweet, tangy, and a little spicy all at once.'
  WHERE name = 'Mango w/ Chamoy' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Italian Ice');

UPDATE flavor SET description = 'Fresh orange Italian ice with a clean, natural sweetness.'
  WHERE name = 'Orange' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Italian Ice');

UPDATE flavor SET description = 'Sweet and tangy pineapple Italian ice. Tropical without being overpowering.'
  WHERE name = 'Pineapple' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Italian Ice');

UPDATE flavor SET description = 'Tastes like a root beer float without the ice cream. That fizzy sweetness, frozen solid.'
  WHERE name = 'Root Beer' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Italian Ice');

UPDATE flavor SET description = 'Tart green apple with a sour punch. One of the most refreshing things on the menu.'
  WHERE name = 'Sour Apple' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Italian Ice');

UPDATE flavor SET description = 'Sweet strawberry Italian ice with real fruit flavor and a clean finish.'
  WHERE name = 'Strawberry' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Italian Ice');

UPDATE flavor SET description = 'Strawberry and lemon together in one Italian ice. Sweet up front, tart at the end.'
  WHERE name = 'Strawberry Lemonade' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Italian Ice');

UPDATE flavor SET description = 'Fresh watermelon Italian ice. Light, sweet, and exactly what you want on a hot day.'
  WHERE name = 'Watermelon' AND menu_id = (SELECT menu_id FROM menu WHERE name = 'Italian Ice');
