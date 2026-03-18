from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from DBHandler import DBHandler

app = FastAPI()

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

@app.post("/owner")
def insert_owner(body: OwnerCreate):
    with DBHandler() as curr:
        curr.execute(
            "INSERT INTO owner (name, email, password_hash) VALUES (%s, %s, %s) RETURNING owner_id;",
            (body.name, body.email, body.password_hash)
        )
        owner_id = curr.fetchone()[0]
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
