from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from DBHandler import DBHandler
from auth import verify_password, create_token, require_admin

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class OwnerCreate(BaseModel):
    name: str
    email: str
    password_hash: str

class ShopCreate(BaseModel):
    owner_id: int
    address: str
    phone_number: str
    instagram: str
    logo_filename: str

class ShopUpdate(BaseModel):
    open_time: Optional[int] = None
    close_time: Optional[int] = None
    phone_number: Optional[str] = None
    instagram: Optional[str] = None

class LoginBody(BaseModel):
    email: str
    password: str

class FlavorCreate(BaseModel):
    menu_name: str
    name: str
    description: Optional[str] = None

class PriceUpdate(BaseModel):
    price_amount: float

class PriceCreate(BaseModel):
    serving_size: str
    price_amount: float

@app.post("/auth/login")
def login(body: LoginBody):
    with DBHandler() as curr:
        curr.execute(
            "SELECT owner_id, password_hash FROM owner WHERE email = %s;",
            (body.email,)
        )
        res = curr.fetchone()
    if not res or not verify_password(body.password, res[1]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_token(res[0])
    return {"token": token}

@app.get("/auth/me")
def me(owner_id: int = Depends(require_admin)):
    with DBHandler() as curr:
        curr.execute(
            "SELECT owner_id, name, email FROM owner WHERE owner_id = %s;",
            (owner_id,)
        )
        res = curr.fetchone()
    if not res:
        raise HTTPException(status_code=404, detail="Owner not found")
    return {"owner": {"owner_id": res[0], "name": res[1], "email": res[2]}}

@app.post("/owner")
def insert_owner(body: OwnerCreate):
    with DBHandler() as curr:
        curr.execute(
            "INSERT INTO owner (name, email, password_hash) VALUES (%s, %s, %s) RETURNING owner_id;",
            (body.name, body.email, body.password_hash)
        )
        res = curr.fetchone()
        owner_id = res[0] if res else None
    return {"owner_id": owner_id}

@app.get("/owner/{owner_id}")
def get_owner(owner_id: int):
    with DBHandler() as curr:
        curr.execute("SELECT * FROM owner WHERE owner_id = %s;", (owner_id,))
        res = curr.fetchone()
    if not res:
        raise HTTPException(status_code=404, detail="Owner not found")
    return {"owner": res}

@app.delete("/owner/{owner_id}")
def delete_owner(owner_id: int):
    with DBHandler() as curr:
        curr.execute("DELETE FROM owner WHERE owner_id = %s;", (owner_id,))
    return {"msg": "Owner deleted"}

@app.post("/shop")
def insert_shop(body: ShopCreate):
    with DBHandler() as curr:
        curr.execute(
            "INSERT INTO shop (owner_id, address, phone_number, instagram, logo_filename) VALUES (%s, %s, %s, %s, %s) RETURNING shop_id;",
            (str(body.owner_id), body.address, body.phone_number, body.instagram, body.logo_filename)
        )
        res = curr.fetchone()
    if not res:
        raise HTTPException(status_code=404, detail="Shop not created")
    return {"shop_id": res}

@app.get("/shop/{shop_id}")
def get_shop(shop_id: int):
    with DBHandler() as curr:
        curr.execute(
            """
            SELECT street, city, state, phone_number, instagram, open_time, close_time
            FROM shop
            WHERE shop_id = %s;
            """,
            (shop_id,)
        )
        res = curr.fetchone()
    if not res:
        raise HTTPException(status_code=404, detail="Shop not found")
    (street, city, state, phone_number, instagram, open_time, close_time) = res
    return {
        "shop": {
            "street": street,
            "city": city,
            "state": state,
            "phone_number": phone_number,
            "instagram": instagram,
            "open_time": open_time,
            "close_time": close_time,
        }
    }

@app.put("/shop/{shop_id}")
def update_shop(shop_id: int, body: ShopUpdate, owner_id: int = Depends(require_admin)):
    fields, values = [], []
    if body.open_time is not None:
        fields.append("open_time = %s")
        values.append(body.open_time)
    if body.close_time is not None:
        fields.append("close_time = %s")
        values.append(body.close_time)
    if body.phone_number is not None:
        fields.append("phone_number = %s")
        values.append(body.phone_number)
    if body.instagram is not None:
        fields.append("instagram = %s")
        values.append(body.instagram)
    if not fields:
        return {"ok": True}
    values.append(shop_id)
    with DBHandler() as curr:
        curr.execute(f"UPDATE shop SET {', '.join(fields)} WHERE shop_id = %s;", values)
    return {"ok": True}

@app.get("/prices")
def get_prices():
    with DBHandler() as curr:
        curr.execute(
            """
            SELECT DISTINCT serving_size, price_amount
            FROM price
            ORDER BY price_amount;
            """
        )
        res = curr.fetchall()
    prices = [{"serving_size": row[0], "price_amount": float(row[1])} for row in res]
    return {"prices": prices}

@app.put("/prices/{serving_size}")
def update_price(serving_size: str, body: PriceUpdate, owner_id: int = Depends(require_admin)):
    with DBHandler() as curr:
        curr.execute(
            "UPDATE price SET price_amount = %s, last_updated = NOW() WHERE serving_size = %s;",
            (body.price_amount, serving_size)
        )
    return {"ok": True}

@app.post("/prices")
def add_price(body: PriceCreate, owner_id: int = Depends(require_admin)):
    with DBHandler() as curr:
        curr.execute("SELECT flavor_id FROM flavor;")
        flavor_ids = [row[0] for row in curr.fetchall()]
        for fid in flavor_ids:
            curr.execute(
                "INSERT INTO price (flavor_id, serving_size, price_amount) VALUES (%s, %s, %s);",
                (fid, body.serving_size, body.price_amount)
            )
    return {"ok": True}

@app.delete("/prices/{serving_size}")
def delete_price(serving_size: str, owner_id: int = Depends(require_admin)):
    with DBHandler() as curr:
        curr.execute("DELETE FROM price WHERE serving_size = %s;", (serving_size,))
    return {"ok": True}

@app.get("/flavors/count")
def get_flavor_count():
    with DBHandler() as curr:
        curr.execute("SELECT COUNT(*) FROM flavor;")
        res = curr.fetchone()
    if not res:
        raise HTTPException(status_code=404, detail="Unable to fetch flavor count")
    return {"flavor_count": res[0]}

@app.get("/flavors/all")
def get_flavors_all():
    menu = {}
    with DBHandler() as curr:
        curr.execute("SELECT name, img_url FROM menu WHERE is_active = True;")
        for item_type, img_url in curr.fetchall():
            menu[item_type] = {"img_url": img_url, "flavors": {}}
        for item_type in menu.keys():
            curr.execute(
                """
                SELECT name, description, updated_at
                FROM flavor
                WHERE menu_id = (SELECT menu_id FROM menu WHERE name = %s);
                """,
                (item_type,)
            )
            res = curr.fetchall()
            menu[item_type]["flavors"] = (
                [{"flavor_name": r[0], "description": r[1], "updated_at": r[2]} for r in res]
                if res else []
            )
    return {"flavors": menu}

@app.get("/admin/flavors")
def get_admin_flavors(owner_id: int = Depends(require_admin)):
    categories = []
    with DBHandler() as curr:
        curr.execute("SELECT menu_id, name FROM menu ORDER BY menu_id;")
        menus = curr.fetchall()
        for menu_id, menu_name in menus:
            curr.execute(
                """
                SELECT flavor_id, name, description
                FROM flavor
                WHERE menu_id = %s
                ORDER BY name;
                """,
                (menu_id,)
            )
            flavors = [
                {"flavor_id": r[0], "name": r[1], "description": r[2]}
                for r in curr.fetchall()
            ]
            categories.append({"menu_id": menu_id, "name": menu_name, "flavors": flavors})
    return {"categories": categories}

@app.post("/flavors")
def add_flavor(body: FlavorCreate, owner_id: int = Depends(require_admin)):
    with DBHandler() as curr:
        curr.execute("SELECT menu_id FROM menu WHERE name = %s;", (body.menu_name,))
        res = curr.fetchone()
        if not res:
            raise HTTPException(status_code=404, detail="Menu category not found")
        curr.execute(
            "INSERT INTO flavor (menu_id, name, description) VALUES (%s, %s, %s) RETURNING flavor_id;",
            (res[0], body.name, body.description)
        )
        flavor_id = curr.fetchone()[0]
    return {"flavor_id": flavor_id}

@app.delete("/flavors/{flavor_id}")
def delete_flavor(flavor_id: int, owner_id: int = Depends(require_admin)):
    with DBHandler() as curr:
        curr.execute("DELETE FROM flavor WHERE flavor_id = %s;", (flavor_id,))
    return {"ok": True}
