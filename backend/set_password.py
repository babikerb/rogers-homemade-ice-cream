#!/usr/bin/env python3
import sys
import os
import getpass

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "api", "src"))

from auth import hash_password
from DBHandler import DBHandler

email = input("Admin email: ")
password = getpass.getpass("New password: ")
hashed = hash_password(password)

with DBHandler() as curr:
    curr.execute("UPDATE owner SET password_hash = %s WHERE email = %s;", (hashed, email))
    if curr.rowcount == 0:
        print(f"No owner found with email: {email}")
    else:
        print("Password updated successfully.")
